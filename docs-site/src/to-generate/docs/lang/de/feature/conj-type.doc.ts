import { defineLanguageOverlayPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "ConjType-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "ConjType",
  order: 8013,
  subject: "ConjType",
  title: "ConjType",
  body: "`ConjType` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / CCONJ](/de/entity/lemma/lexeme/cconj/) verwendet das Merkmal inhärent.\n- [Lexeme / SCONJ](/de/entity/lemma/lexeme/sconj/) verwendet das Merkmal inhärent.",
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
