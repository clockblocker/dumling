import {
	existsSync,
	mkdirSync,
	readFileSync,
	rmSync,
	writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { getLanguageApi } from "../../../../../src/index.ts";
import type { SupportedLanguage } from "../../../../../src/types/public-types.ts";
import { ensureTextFile } from "../../shared/fs";
import { sourceAttestationsDir } from "../../shared/paths";
import type {
	LogbookFileKind,
	SelectionAttestationSource,
} from "../../shared/types";
import { selectionSemanticSourcePath } from "./semantic-source-path";

export function csvCell(value: string): string {
	return /[",\n\r]/u.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
}

export function defaultLogbookText(kind: LogbookFileKind): string {
	if (kind === "classifier") {
		return "### Classifier Notes\n\n-\n\n### Open Questions\n\n-\n";
	}
	if (kind === "reviewer") {
		return "### Reviewer Notes\n\n-\n\n### Open Questions\n\n-\n";
	}
	return "### Common Mistakes\n\n-\n\n### Locked-In Rules\n\n-\n";
}

export function requiredLogbookSections(kind: LogbookFileKind): string[] {
	if (kind === "classifier") {
		return ["Classifier Notes", "Open Questions"];
	}
	if (kind === "reviewer") {
		return ["Reviewer Notes", "Open Questions"];
	}
	return ["Common Mistakes", "Locked-In Rules"];
}

export function validateLogbookFile(
	path: string,
	kind: LogbookFileKind,
): void {
	const text = readFileSync(path, "utf8");
	const headings = [...text.matchAll(/^### (.+)$/gmu)];
	const expectedSections = requiredLogbookSections(kind);
	const actualSections = headings.map((match) => match[1]?.trim() ?? "");

	if (
		actualSections.length !== expectedSections.length ||
		actualSections.some(
			(section, index) => section !== expectedSections[index],
		)
	) {
		throw new Error(
			`${path} must contain exactly these sections in order: ${expectedSections.map((section) => `### ${section}`).join(", ")}.`,
		);
	}

	for (let index = 0; index < headings.length; index += 1) {
		const start = headings[index]?.index;
		if (start === undefined) {
			continue;
		}
		const headingLine = headings[index]?.[0] ?? "";
		const bodyStart = start + headingLine.length;
		const bodyEnd =
			index + 1 < headings.length
				? (headings[index + 1]?.index ?? text.length)
				: text.length;
		const body = text.slice(bodyStart, bodyEnd).trim();

		if (body.length === 0) {
			throw new Error(
				`${path} section "### ${expectedSections[index]}" must not be empty; empty sections must contain exactly "-".`,
			);
		}
		if (body.startsWith("-") && body !== "-" && !body.startsWith("-\n")) {
			throw new Error(
				`${path} section "### ${expectedSections[index]}" must be exactly "-" when empty.`,
			);
		}
	}
}

export function migrateLegacySelectionNotes(): void {
	for (const language of ["de", "en", "he"] satisfies SupportedLanguage[]) {
		const languageDir = join(sourceAttestationsDir, language);
		const logbookDir = join(languageDir, "classification-logbook");
		const legacyPath = join(
			languageDir,
			`${language}-selection-decisions.md`,
		);
		const classifierNotesPath = join(logbookDir, "classifier-notes.md");
		const reviewerNotesPath = join(logbookDir, "reviewer-notes.md");
		const summaryPath = join(logbookDir, "summary.md");

		mkdirSync(logbookDir, { recursive: true });

		if (existsSync(legacyPath) && !existsSync(classifierNotesPath)) {
			const legacyText = readFileSync(legacyPath, "utf8").trim();
			writeFileSync(
				classifierNotesPath,
				`### Classifier Notes\n\n${legacyText}\n\n### Open Questions\n\n-\n`,
			);
			rmSync(legacyPath);
		} else {
			ensureTextFile(
				classifierNotesPath,
				defaultLogbookText("classifier"),
			);
		}

		ensureTextFile(reviewerNotesPath, defaultLogbookText("reviewer"));
		ensureTextFile(summaryPath, defaultLogbookText("summary"));
		validateLogbookFile(classifierNotesPath, "classifier");
		validateLogbookFile(reviewerNotesPath, "reviewer");
		validateLogbookFile(summaryPath, "summary");
	}
}

export function writeSelectionLogbookCsv(
	selections: SelectionAttestationSource[],
): void {
	const rowsByLanguage = new Map<
		SupportedLanguage,
		SelectionAttestationSource[]
	>();

	for (const selection of selections) {
		const existing = rowsByLanguage.get(selection.entity.language) ?? [];
		existing.push(selection);
		rowsByLanguage.set(selection.entity.language, existing);
	}

	for (const language of ["de", "en", "he"] satisfies SupportedLanguage[]) {
		const selectionsForLanguage = (
			rowsByLanguage.get(language) ?? []
		).toSorted((left, right) =>
			selectionSemanticSourcePath(left).localeCompare(
				selectionSemanticSourcePath(right),
				language,
			),
		);
		const logbookDir = join(
			sourceAttestationsDir,
			language,
			"classification-logbook",
		);
		mkdirSync(logbookDir, { recursive: true });
		const csvPath = join(logbookDir, `${language}-attested-selections.csv`);
		const lines = [
			"sentence_markdown,sectionId,lessonsLearned",
			...selectionsForLanguage.map((selection) =>
				[
					csvCell(selection.sentenceMarkdown),
					csvCell(
						String(
							getLanguageApi(
								selection.entity.language,
							).id.encode.asCsv(selection.entity),
						),
					),
					csvCell(selection.lessonsLearned ?? ""),
				].join(","),
			),
		];
		writeFileSync(csvPath, `${lines.join("\n")}\n`);
	}
}
