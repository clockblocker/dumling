import { defineLanguageOverlayPage } from "../../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "CCONJ-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "CCONJ",
  order: 4009,
  subject: "CCONJ",
  title: "CCONJ",
  body: "`CCONJ` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/entity/lemma/lexeme/) und ist über [POS](/de/entity/lemma/lexeme/) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [ConjType](/de/feature/conj-type/)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
