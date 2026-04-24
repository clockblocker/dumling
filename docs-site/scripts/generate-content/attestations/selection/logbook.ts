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
	const expectedSections = requiredLogbookSections(kind);
	const sectionMatches: RegExpExecArray[] = [];

	for (const section of expectedSections) {
		const escapedSection = section.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
		const matcher = new RegExp(`^### ${escapedSection}$`, "gmu");
		const previousMatchIndex =
			sectionMatches[sectionMatches.length - 1]?.index ?? -1;
		matcher.lastIndex = previousMatchIndex + 1;
		const match = matcher.exec(text);

		if (match?.index === undefined) {
			throw new Error(
				`${path} must contain these sections in order: ${expectedSections.map((expectedSection) => `### ${expectedSection}`).join(", ")}.`,
			);
		}

		sectionMatches.push(match);
	}

	for (let index = 0; index < sectionMatches.length; index += 1) {
		const start = sectionMatches[index]?.index;
		if (start === undefined) continue;
		const headingLine = sectionMatches[index]?.[0] ?? "";
		const bodyStart = start + headingLine.length;
		const bodyEnd =
			index + 1 < sectionMatches.length
				? (sectionMatches[index + 1]?.index ?? text.length)
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
		const reviewerNotesPath = join(logbookDir, "reviewer-notes.md");
		const summaryPath = join(logbookDir, "summary.md");

		mkdirSync(logbookDir, { recursive: true });

		if (existsSync(legacyPath)) {
			rmSync(legacyPath);
		}
		rmSync(join(logbookDir, "classifier-notes.md"), { force: true });

		ensureTextFile(reviewerNotesPath, defaultLogbookText("reviewer"));
		ensureTextFile(summaryPath, defaultLogbookText("summary"));
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
		const selectionsCsvPath = join(
			logbookDir,
			`${language}-attested-selections.csv`,
		);
		const descriptorCsvPath = join(
			logbookDir,
			`${language}-attested-selection-descriptors.csv`,
		);
		const selectionLines = [
			"sentence_markdown,sectionId,classifierNotes,lessonsLearned",
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
					csvCell(selection.classifierNotes ?? ""),
					csvCell(selection.lessonsLearned ?? ""),
				].join(","),
			),
		];
		const descriptorLines = [
			"sentence_markdown,normalizedFullSurface,orthographicStatus,surfaceKind,lemmaKind,lemmaSubKind",
			...selectionsForLanguage.map((selection) => {
				const descriptorFields = String(
					getLanguageApi(selection.entity.language).describe.asCsv.selection(
						selection.entity,
					),
				).split(",");
				const [
					_entityKind,
					_descriptorLanguage,
					orthographicStatus,
					surfaceKind,
					lemmaKind,
					lemmaSubKind,
				] = descriptorFields;

				if (
					orthographicStatus === undefined ||
					surfaceKind === undefined ||
					lemmaKind === undefined ||
					lemmaSubKind === undefined
				) {
					throw new Error(
						`Unexpected descriptor CSV shape for ${selectionSemanticSourcePath(selection)}.`,
					);
				}

				return [
					csvCell(selection.sentenceMarkdown),
					csvCell(selection.entity.surface.normalizedFullSurface),
					csvCell(orthographicStatus),
					csvCell(surfaceKind),
					csvCell(lemmaKind),
					csvCell(lemmaSubKind),
				].join(",");
			}),
		];
		writeFileSync(selectionsCsvPath, `${selectionLines.join("\n")}\n`);
		writeFileSync(descriptorCsvPath, `${descriptorLines.join("\n")}\n`);
	}
}
