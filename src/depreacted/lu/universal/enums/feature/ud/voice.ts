import { z } from "zod/v3";

const voiceValues = [
	"Act", // active; actor-focus
	"Antip", // antipassive
	"Bfoc", // beneficiary-focus
	"Cau", // causative
	"Dir", // direct
	"Inv", // inverse
	"Lfoc", // location-focus
	"Mid", // middle
	"Pass", // passive; patient-focus
	"Rcp", // reciprocal
] as const;

// Source: https://universaldependencies.org/u/feat/Voice.html
export const DeprecatedVoice = z.enum(voiceValues);
export type DeprecatedVoice = z.infer<typeof DeprecatedVoice>;
