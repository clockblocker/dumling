import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "Gender[psor]-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: {
    docId: "Gender[psor]",
    html: "Gender-psor"
  },
  order: 8020,
  subject: "Gender[psor]",
  title: "Gender[psor]",
  body: "`Gender[psor]` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / DET](/de/pos/DET.html) verwendet das Merkmal flektionsgetragen.",
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
