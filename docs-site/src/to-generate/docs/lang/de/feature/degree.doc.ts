import { defineLanguageOverlayPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "Degree-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "Degree",
  order: 8015,
  subject: "Degree",
  title: "Degree",
  body: "`Degree` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / ADJ](/de/entity/lemma/lexeme/adj/) verwendet das Merkmal flektionsgetragen.\n- [Lexeme / ADV](/de/entity/lemma/lexeme/adv/) verwendet das Merkmal flektionsgetragen.\n- [Lexeme / DET](/de/entity/lemma/lexeme/det/) verwendet das Merkmal flektionsgetragen.",
      examples: [],
      heading: "Verwendung im deutschen Pack"
    },
    {
      body: "Verwandte Überblicksseiten:\n- [Feature](/de/feature/)\n- [Kind](/de/entity/lemma/)",
      examples: [],
      heading: "Einordnung"
    }
  ]
});

export default document;
