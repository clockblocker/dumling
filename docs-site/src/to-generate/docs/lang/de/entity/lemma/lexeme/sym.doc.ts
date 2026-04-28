import { defineLanguageOverlayPage } from "../../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "SYM-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "SYM",
  order: 4016,
  subject: "SYM",
  title: "SYM",
  body: "`SYM` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/entity/lemma/lexeme/) und ist über [POS](/de/entity/lemma/lexeme/) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Case](/de/feature/case/)\n- [Foreign](/de/feature/foreign/)\n- [Gender](/de/feature/gender/)\n- [Number](/de/feature/number/)\n- [NumType](/de/feature/num-type/)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
