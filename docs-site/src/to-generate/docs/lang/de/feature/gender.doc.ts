import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "Gender-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "Gender",
  order: 8019,
  subject: "Gender",
  title: "Gender",
  body: "`Gender` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / NOUN](/de/pos/NOUN.html) verwendet das Merkmal inhärent.\n- [Lexeme / PROPN](/de/pos/PROPN.html) verwendet das Merkmal inhärent.\n- [Lexeme / ADJ](/de/pos/ADJ.html) verwendet das Merkmal flektionsgetragen.\n- [Lexeme / DET](/de/pos/DET.html) verwendet das Merkmal flektionsgetragen.\n- [Lexeme / NUM](/de/pos/NUM.html) verwendet das Merkmal flektionsgetragen.\n- [Lexeme / PRON](/de/pos/PRON.html) verwendet das Merkmal flektionsgetragen.\n- [Lexeme / SYM](/de/pos/SYM.html) verwendet das Merkmal flektionsgetragen.\n- [Lexeme / X](/de/pos/X.html) verwendet das Merkmal flektionsgetragen.",
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
