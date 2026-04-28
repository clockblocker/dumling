import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "Degree-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "Degree",
  order: 8015,
  subject: "Degree",
  title: "Degree",
  body: "`Degree` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / ADJ](/de/pos/ADJ.html) verwendet das Merkmal flektionsgetragen.\n- [Lexeme / ADV](/de/pos/ADV.html) verwendet das Merkmal flektionsgetragen.\n- [Lexeme / DET](/de/pos/DET.html) verwendet das Merkmal flektionsgetragen.",
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
