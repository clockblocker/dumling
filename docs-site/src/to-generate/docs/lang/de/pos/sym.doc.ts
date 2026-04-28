import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "SYM-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "SYM",
  order: 4016,
  subject: "SYM",
  title: "SYM",
  body: "`SYM` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/kind/Lexeme.html) und ist über [POS](/de/pos.html) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Case](/de/feature/Case.html)\n- [Foreign](/de/feature/Foreign.html)\n- [Gender](/de/feature/Gender.html)\n- [Number](/de/feature/Number.html)\n- [NumType](/de/feature/NumType.html)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
