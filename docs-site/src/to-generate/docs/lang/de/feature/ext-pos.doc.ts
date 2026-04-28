import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "ExtPos-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "ExtPos",
  order: 8017,
  subject: "ExtPos",
  title: "ExtPos",
  body: "`ExtPos` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / ADP](/de/pos/ADP.html) verwendet das Merkmal inhärent.\n- [Lexeme / DET](/de/pos/DET.html) verwendet das Merkmal inhärent.\n- [Lexeme / PRON](/de/pos/PRON.html) verwendet das Merkmal inhärent.",
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
