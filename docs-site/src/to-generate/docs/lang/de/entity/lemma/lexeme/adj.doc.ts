import { defineLanguageOverlayPage } from "../../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "ADJ-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "ADJ",
  order: 4001,
  subject: "ADJ",
  title: "ADJ",
  body: "`ADJ` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/entity/lemma/lexeme/) und ist über [POS](/de/entity/lemma/lexeme/) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Abbr](/de/feature/abbr/)\n- [Case](/de/feature/case/)\n- [Degree](/de/feature/degree/)\n- [Foreign](/de/feature/foreign/)\n- [Gender](/de/feature/gender/)\n- [Number](/de/feature/number/)\n- [NumType](/de/feature/num-type/)\n- [Variant](/de/feature/variant/)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
