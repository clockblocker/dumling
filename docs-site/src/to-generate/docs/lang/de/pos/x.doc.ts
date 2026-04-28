import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "X-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "X",
  order: 4017,
  subject: "X",
  title: "X",
  body: "`X` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/kind/Lexeme.html) und ist über [POS](/de/pos.html) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Abbr](/de/feature/Abbr.html)\n- [Case](/de/feature/Case.html)\n- [Foreign](/de/feature/Foreign.html)\n- [Gender](/de/feature/Gender.html)\n- [Hyph](/de/feature/Hyph.html)\n- [Mood](/de/feature/Mood.html)\n- [Number](/de/feature/Number.html)\n- [NumType](/de/feature/NumType.html)\n- [VerbForm](/de/feature/VerbForm.html)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
