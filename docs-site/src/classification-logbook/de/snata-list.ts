export const naughtyBoys = [
	`"[Es] brennt die Hand, es brennt das Haar, es brennt das ganze Kind sogar."`,
	`"Es brennt die Hand, es brennt das Haar, es brennt das [ganze] Kind sogar."`,
	`"Es brennt die Hand, es brennt das Haar, es brennt das ganze Kind [sogar]."`,
	`[Es] zog der wilde Jägersmann sein grasgrün neues Röcklein an;`,
	`[Fort] geht nun die Mutter und wupp! den Daumen in den Mund.`,
	`Fort geht nun die Mutter und [wupp]! den Daumen in den Mund.`,
	`Genau da liegt der [Hase] im Pfeffer.`,
	`"[Guten Tag], ich habe einen Termin."`,
	`"Ich gehe Tomaten kaufen, um einen Salat [zu] machen."`,
	`"Jetzt schien die Sonne gar zu sehr, da [ward] ihm sein Gewehr zu schwer."`,
	`"[Morgenstund] hat Gold im Mund, sagte sie verschlafen."`,
	`"[Na ja], ganz überzeugt bin ich nicht."`,
	`"Na [ja], ganz überzeugt bin ich nicht."`,
	`"nahm Ranzen, Pulverhorn und Flint und [lief] hinaus ins Feld geschwind"`,
	`"nahm Ranzen, Pulverhorn und Flint und lief [hinaus] ins Feld geschwind"`,
	`"Sieh [einmal], hier steht er, pfui, der Struwwelpeter!"`,
	`"[Tut mir leid], das war mein Fehler."`,
	`"Und Minz und Maunz, die schreien [gar] jämmerlich zu zweien"`,
	`"[Verbrannt] ist alles ganz und gar, das arme Kind mit Haut und Haar;"`,
	`"Verbrannt ist alles [ganz] und gar, das arme Kind mit Haut und Haar;"`,
	`"Verbrannt ist alles ganz [und] gar, das arme Kind mit Haut und Haar;"`,
	`"Verbrannt ist alles ganz und [gar], das arme Kind mit Haut und Haar;"`,
	`"Verbrannt ist alles ganz und gar, das arme Kind mit [Haut] und Haar;"`,
	`"Verbrannt ist alles ganz und gar, das arme Kind mit Haut [und] Haar;"`,
	`"Verbrannt ist alles ganz und gar, das arme Kind mit Haut und [Haar];"`,
	`[Wegen] dem Regen kamen wir zu spät.`,
];

export const unstampedGoodBoys = [
	`Es [zog] der wilde Jägersmann sein grasgrün neues Röcklein an;`,
	`Es zog der wilde Jägersmann sein grasgrün neues Röcklein [an];`,
	`"Jetzt schien die Sonne gar zu sehr, [da] ward ihm sein Gewehr zu schwer."`,
	`"nahm Ranzen, Pulverhorn und Flint und lief hinaus [ins] Feld geschwind"`,
	`"nahm Ranzen, Pulverhorn und Flint und lief hinaus ins Feld [geschwind]"`,
	`"Und Minz und Maunz, die schreien gar [jämmerlich] zu zweien"`,
] as const;

export const children = [
]

export const unstampedGoodBoySet = new Set<string>(unstampedGoodBoys);
