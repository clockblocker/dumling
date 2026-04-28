import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "NumType-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "NumType",
  order: 8029,
  subject: "NumType",
  title: "NumType",
  body: "`NumType` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / ADJ](/de/pos/ADJ.html) verwendet das Merkmal inhärent.\n- [Lexeme / ADV](/de/pos/ADV.html) verwendet das Merkmal inhärent.\n- [Lexeme / DET](/de/pos/DET.html) verwendet das Merkmal inhärent.\n- [Lexeme / NUM](/de/pos/NUM.html) verwendet das Merkmal inhärent.\n- [Lexeme / SYM](/de/pos/SYM.html) verwendet das Merkmal inhärent.\n- [Lexeme / X](/de/pos/X.html) verwendet das Merkmal inhärent.",
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
