import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "VerbType-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "VerbType",
  order: 8040,
  subject: "VerbType",
  title: "VerbType",
  body: "`VerbType` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / AUX](/de/pos/AUX.html) verwendet das Merkmal inhärent.\n- [Lexeme / VERB](/de/pos/VERB.html) verwendet das Merkmal inhärent.",
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
