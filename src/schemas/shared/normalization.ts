import { z } from "zod/v3";

export function normalizeNfc(value: string) {
	return value.normalize("NFC");
}

export function normalizeNfcLowercase(value: string) {
	return normalizeNfc(value).toLowerCase();
}

export function normalizedStringSchema() {
	return z.string().min(1).transform(normalizeNfc);
}

export function normalizedLowercaseStringSchema() {
	return z.string().min(1).transform(normalizeNfcLowercase);
}
