import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "SCONJ-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "SCONJ",
  order: 4014,
  subject: "SCONJ",
  title: "SCONJ",
  body: "`SCONJ` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/kind/Lexeme.html) und ist über [POS](/de/pos.html) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [ConjType](/de/feature/ConjType.html)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
