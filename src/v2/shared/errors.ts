export class NotImplementedYetError extends Error {
	readonly language: "en" | "he";

	constructor(language: "en" | "he") {
		super(`dumling.${language} is not implemented yet`);
		this.language = language;
		this.name = "NotImplementedYetError";
	}
}
