import { defineLanguageOverlayPage } from "../../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "AUX-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "AUX",
  order: 4008,
  subject: "AUX",
  title: "AUX",
  body: "`AUX` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/entity/lemma/lexeme/) und ist über [POS](/de/entity/lemma/lexeme/) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [VerbType](/de/feature/verb-type/)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
