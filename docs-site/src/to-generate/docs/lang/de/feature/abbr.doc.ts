import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "Abbr-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "Abbr",
  order: 8010,
  subject: "Abbr",
  title: "Abbr",
  body: "`Abbr` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / ADJ](/de/pos/ADJ.html) verwendet das Merkmal inhärent.\n- [Lexeme / ADP](/de/pos/ADP.html) verwendet das Merkmal inhärent.\n- [Lexeme / NUM](/de/pos/NUM.html) verwendet das Merkmal inhärent.\n- [Lexeme / PART](/de/pos/PART.html) verwendet das Merkmal inhärent.\n- [Lexeme / PROPN](/de/pos/PROPN.html) verwendet das Merkmal inhärent.\n- [Lexeme / X](/de/pos/X.html) verwendet das Merkmal inhärent.",
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
