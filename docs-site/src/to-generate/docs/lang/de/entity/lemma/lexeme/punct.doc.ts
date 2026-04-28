import { defineLanguageOverlayPage } from "../../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "PUNCT-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "PUNCT",
  order: 4015,
  subject: "PUNCT",
  title: "PUNCT",
  body: "`PUNCT` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/entity/lemma/lexeme/) und ist über [POS](/de/entity/lemma/lexeme/) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [PunctType](/de/feature/punct-type/)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
