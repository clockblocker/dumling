import { defineLanguageOverlayPage } from "../../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "ADP-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "ADP",
  order: 4007,
  subject: "ADP",
  title: "ADP",
  body: "`ADP` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/entity/lemma/lexeme/) und ist über [POS](/de/entity/lemma/lexeme/) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Abbr](/de/feature/abbr/)\n- [AdpType](/de/feature/adp-type/)\n- [ExtPos](/de/feature/ext-pos/)\n- [Foreign](/de/feature/foreign/)\n- [GovernedCase](/de/feature/governed-case/)\n- [PartType](/de/feature/part-type/)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
