import { generateAttestations } from "./attestations/generate-attestations";
import { generateDocs } from "./docs/generate-docs";

export async function generateContent(): Promise<void> {
	await generateAttestations();
	generateDocs();
}
