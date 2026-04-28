import { defineLanguageOverlayPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "HasSepPrefix-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "HasSepPrefix",
  order: 8023,
  subject: "HasSepPrefix",
  title: "HasSepPrefix",
  body: "`HasSepPrefix` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / VERB](/de/entity/lemma/lexeme/verb/) verwendet das Merkmal inhärent.\n- [Morpheme / Prefix](/de/entity/lemma/morpheme/prefix/) verwendet das Merkmal inhärent.",
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
