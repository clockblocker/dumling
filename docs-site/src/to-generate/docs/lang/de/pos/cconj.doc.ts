import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "CCONJ-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "CCONJ",
  order: 4009,
  subject: "CCONJ",
  title: "CCONJ",
  body: "`CCONJ` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/kind/Lexeme.html) und ist über [POS](/de/pos.html) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [ConjType](/de/feature/ConjType.html)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
