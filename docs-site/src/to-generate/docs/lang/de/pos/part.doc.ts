import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "PART-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "PART",
  order: 4012,
  subject: "PART",
  title: "PART",
  body: "`PART` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/kind/Lexeme.html) und ist über [POS](/de/pos.html) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Abbr](/de/feature/Abbr.html)\n- [Foreign](/de/feature/Foreign.html)\n- [PartType](/de/feature/PartType.html)\n- [Polarity](/de/feature/Polarity.html)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
