import { defineLanguageOverlayPage } from "../../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "NOUN-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "NOUN",
  order: 4004,
  subject: "NOUN",
  title: "NOUN",
  body: "`NOUN` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/entity/lemma/lexeme/) und ist über [POS](/de/entity/lemma/lexeme/) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Case](/de/feature/case/)\n- [Gender](/de/feature/gender/)\n- [Hyph](/de/feature/hyph/)\n- [Number](/de/feature/number/)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
