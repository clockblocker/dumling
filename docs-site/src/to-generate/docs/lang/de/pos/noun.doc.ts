import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "NOUN-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "NOUN",
  order: 4004,
  subject: "NOUN",
  title: "NOUN",
  body: "`NOUN` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/kind/Lexeme.html) und ist über [POS](/de/pos.html) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Case](/de/feature/Case.html)\n- [Gender](/de/feature/Gender.html)\n- [Hyph](/de/feature/Hyph.html)\n- [Number](/de/feature/Number.html)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
