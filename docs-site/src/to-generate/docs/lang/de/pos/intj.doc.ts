import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "INTJ-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "INTJ",
  order: 4003,
  subject: "INTJ",
  title: "INTJ",
  body: "`INTJ` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/kind/Lexeme.html) und ist über [POS](/de/pos.html) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [PartType](/de/feature/PartType.html)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
