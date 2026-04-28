import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "Hyph-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "Hyph",
  order: 8024,
  subject: "Hyph",
  title: "Hyph",
  body: "`Hyph` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / NOUN](/de/pos/NOUN.html) verwendet das Merkmal inhärent.\n- [Lexeme / X](/de/pos/X.html) verwendet das Merkmal inhärent.",
      examples: [],
      heading: "Verwendung im deutschen Pack"
    },
    {
      body: "Verwandte Überblicksseiten:\n- [Feature](/de/feature.html)\n- [Kind](/de/kind.html)",
      examples: [],
      heading: "Einordnung"
    }
  ]
});

export default document;
