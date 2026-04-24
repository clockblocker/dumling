import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { getLanguageApi } from "../../../../src/index.ts";
import { parseFrontmatter } from "../docs/frontmatter";
import { publicMarkdownPathForRouteId } from "../docs/routes";
import { listMarkdownFiles, writeGeneratedMarkdown } from "../shared/fs";
import {
	generatedDocsDir,
	publicDir,
	sourceAttestationsDir,
} from "../shared/paths";
import type { SelectionAttestationSource, SourcePage } from "../shared/types";
import { generatedFrontmatterForAttestation } from "./render/generated-frontmatter";
import { renderAttestationBody } from "./render/render-attestation-body";
import { migrateLegacySelectionNotes, writeSelectionLogbookCsv } from "./selection/logbook";
import { renameSelectionSources } from "./selection/rename-selection-sources";
import { loadAttestationSource } from "./source/load-attestation-source";
import { validateAttestationPath } from "./validate/validate-attestation-path";
import {
	isSelectionAttestationSource,
	validateSelectionAttestation,
} from "./validate/validate-selection-attestation";

function removeGeneratedAttestationOutputs(): void {
	for (const generatedPath of listMarkdownFiles(generatedDocsDir)) {
		if (!existsSync(generatedPath)) {
			continue;
		}

		const { frontmatter } = parseFrontmatter(
			readFileSync(generatedPath, "utf8"),
			generatedPath,
		);
		if (
			frontmatter.slug === undefined ||
			!frontmatter.slug.includes("/attestation/")
		) {
			continue;
		}

		rmSync(generatedPath);
		rmSync(publicMarkdownPathForRouteId(frontmatter.slug), { force: true });
	}
}

export async function generateAttestations(): Promise<SourcePage[]> {
	const pages: SourcePage[] = [];
	const selectionSources: SelectionAttestationSource[] = [];

	mkdirSync(generatedDocsDir, { recursive: true });
	mkdirSync(publicDir, { recursive: true });
	removeGeneratedAttestationOutputs();
	migrateLegacySelectionNotes();
	const sourcePaths = await renameSelectionSources();

	for (const sourcePath of sourcePaths) {
		const source = await loadAttestationSource(sourcePath);
		validateSelectionAttestation(source);
		const languageApi = getLanguageApi(source.entity.language);
		const base64UrlId = String(
			languageApi.id.encode.asBase64Url(source.entity),
		);
		validateAttestationPath(source, base64UrlId);

		const routeId = `lang/${source.entity.language}/attestation/${base64UrlId}`;
		const frontmatter = generatedFrontmatterForAttestation(source, routeId);
		const body = renderAttestationBody(
			source,
			String(languageApi.id.encode.asCsv(source.entity)),
		);

		writeGeneratedMarkdown(
			routeId,
			frontmatter,
			body,
			publicMarkdownPathForRouteId(routeId),
		);
		pages.push({ frontmatter, routeId, sourcePath });
		if (isSelectionAttestationSource(source)) {
			selectionSources.push(source);
		}
	}

	writeSelectionLogbookCsv(selectionSources);

	return pages;
}
