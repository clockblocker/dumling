import { defineLanguageOverlayPage } from "../../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "X-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "X",
  order: 4017,
  subject: "X",
  title: "X",
  body: "`X` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/entity/lemma/lexeme/) und ist über [POS](/de/entity/lemma/lexeme/) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Abbr](/de/feature/abbr/)\n- [Case](/de/feature/case/)\n- [Foreign](/de/feature/foreign/)\n- [Gender](/de/feature/gender/)\n- [Hyph](/de/feature/hyph/)\n- [Mood](/de/feature/mood/)\n- [Number](/de/feature/number/)\n- [NumType](/de/feature/num-type/)\n- [VerbForm](/de/feature/verb-form/)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
