import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "DiscourseFormulaRole-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "DiscourseFormulaRole",
  order: 8016,
  subject: "DiscourseFormulaRole",
  title: "DiscourseFormulaRole",
  body: "`DiscourseFormulaRole` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Phraseme / DiscourseFormula](/de/phraseme/DiscourseFormula.html) verwendet das Merkmal inhärent.",
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
