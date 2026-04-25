export const unstampedGoodBoys = [
	"Das wäre [fast] schief gewesen.",
	`Einst ging er [an] Ufers Rand
mit der Mappe in der Hand.`,
	"In [ge]lacht markieren ge- und -t zusammen das Partizip.",
	"Mit [keinem] Wort erwähnte sie den Plan.",
	"[Pass] auf dich auf!",
	"Pass [auf] dich auf!",
	"Pass auf dich [auf]!",
	`[Sieh] einmal, hier steht er, 
pfui, der Struwwelpeter!`,
	`Sieh einmal, hier steht er, 
[pfui], der Struwwelpeter!`,
	`Sieh einmal, hier steht er, 
pfui, [der] Struwwelpeter!`,
	`Sieh einmal, hier steht er, 
pfui, der [Struwwelpeter]!`,
	`Und Minz und Maunz, die schreien
gar jämmerlich [zu] zweien`,
	`Und Minz und Maunz, die schreien
gar jämmerlich zu [zweien]`,
	"Unter falschem [Namen] mietete er das Zimmer.",
	"Wir liefen den Fluss [entlang].",
] as const;

export const unstampedGoodBoySet = new Set<string>(unstampedGoodBoys);
