import { defineLanguageOverlayPage } from "../../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "PART-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "PART",
  order: 4012,
  subject: "PART",
  title: "PART",
  body: "`PART` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/entity/lemma/lexeme/) und ist über [POS](/de/entity/lemma/lexeme/) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Abbr](/de/feature/abbr/)\n- [Foreign](/de/feature/foreign/)\n- [PartType](/de/feature/part-type/)\n- [Polarity](/de/feature/polarity/)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
