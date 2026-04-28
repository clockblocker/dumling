import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "PronType-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "PronType",
  order: 8035,
  subject: "PronType",
  title: "PronType",
  body: "`PronType` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / ADV](/de/pos/ADV.html) verwendet das Merkmal inhärent.\n- [Lexeme / DET](/de/pos/DET.html) verwendet das Merkmal inhärent.\n- [Lexeme / PRON](/de/pos/PRON.html) verwendet das Merkmal inhärent.",
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
