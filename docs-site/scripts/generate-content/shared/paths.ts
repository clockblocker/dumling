import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const scriptDir = dirname(fileURLToPath(import.meta.url));
export const siteRoot = resolve(scriptDir, "../../..");
export const repoRoot = resolve(siteRoot, "..");
export const sourceAttestationsDir = join(
	siteRoot,
	"src/to-generate/attestations",
);
export const sourceDocsDir = join(siteRoot, "src/to-generate/docs");
export const generatedDocsDir = join(siteRoot, "src/generated/docs");
export const generatedEntitiesDir = join(siteRoot, "src/generated/entities");
export const publicDir = join(siteRoot, "public");
export const readmeExamplesDir = join(repoRoot, "generate-readme/examples");
