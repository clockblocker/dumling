import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "ConjType-Seite im öffentlichen Feature-Baum.",
  family: "feature",
  leaf: "ConjType",
  order: 8013,
  subject: "ConjType",
  title: "ConjType",
  body: "`ConjType` ist eine flache grammatische Feature-Seite im deutschen Pack.\n\nDoc-cite verwendet genau eine öffentliche Route pro Feature-Namen, auch wenn das Merkmal je nach Lemma-Subkind an unterschiedlichen Stellen im Modell auftaucht.",
  subsections: [
    {
      body: "Im deutschen Pack verwendet von:\n- [Lexeme / CCONJ](/de/pos/CCONJ.html) verwendet das Merkmal inhärent.\n- [Lexeme / SCONJ](/de/pos/SCONJ.html) verwendet das Merkmal inhärent.",
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
