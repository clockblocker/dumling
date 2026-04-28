import { defineLanguageOverlayPage } from "../../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "INTJ-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "INTJ",
  order: 4003,
  subject: "INTJ",
  title: "INTJ",
  body: "`INTJ` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/entity/lemma/lexeme/) und ist über [POS](/de/entity/lemma/lexeme/) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [PartType](/de/feature/part-type/)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
