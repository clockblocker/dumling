import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "PUNCT-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "PUNCT",
  order: 4015,
  subject: "PUNCT",
  title: "PUNCT",
  body: "`PUNCT` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/kind/Lexeme.html) und ist über [POS](/de/pos.html) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [PunctType](/de/feature/PunctType.html)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
