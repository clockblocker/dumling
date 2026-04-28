import { defineLanguageOverlayPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "VerbType-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "VerbType",
  order: 8040,
  subject: "VerbType",
  title: "VerbType",
  body: "`VerbType` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / AUX](/de/entity/lemma/lexeme/aux/) verwendet das Merkmal inhärent.\n- [Lexeme / VERB](/de/entity/lemma/lexeme/verb/) verwendet das Merkmal inhärent.",
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
