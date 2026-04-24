import { mkdirSync } from "node:fs";
import { generateDocPages } from "./generate-doc-pages";
import { removeGeneratedDocOutputs, writeNavFiles } from "./write-nav";
import { generatedDocsDir, publicDir } from "../shared/paths";

export function generateDocs(): void {
	mkdirSync(generatedDocsDir, { recursive: true });
	mkdirSync(publicDir, { recursive: true });
	removeGeneratedDocOutputs();
	generateDocPages();
	writeNavFiles();
}
