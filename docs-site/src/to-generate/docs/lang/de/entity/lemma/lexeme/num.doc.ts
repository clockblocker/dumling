import { defineLanguageOverlayPage } from "../../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "NUM-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "NUM",
  order: 4011,
  subject: "NUM",
  title: "NUM",
  body: "`NUM` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/entity/lemma/lexeme/) und ist über [POS](/de/entity/lemma/lexeme/) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Abbr](/de/feature/abbr/)\n- [Case](/de/feature/case/)\n- [Foreign](/de/feature/foreign/)\n- [Gender](/de/feature/gender/)\n- [Number](/de/feature/number/)\n- [NumType](/de/feature/num-type/)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
