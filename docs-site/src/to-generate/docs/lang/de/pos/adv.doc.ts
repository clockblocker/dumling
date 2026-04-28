import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "ADV-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "ADV",
  order: 4002,
  subject: "ADV",
  title: "ADV",
  body: "`ADV` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/kind/Lexeme.html) und ist über [POS](/de/pos.html) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Degree](/de/feature/Degree.html)\n- [Foreign](/de/feature/Foreign.html)\n- [NumType](/de/feature/NumType.html)\n- [PronType](/de/feature/PronType.html)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
