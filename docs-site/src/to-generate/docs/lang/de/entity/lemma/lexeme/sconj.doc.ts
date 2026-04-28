import { defineLanguageOverlayPage } from "../../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "SCONJ-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "SCONJ",
  order: 4014,
  subject: "SCONJ",
  title: "SCONJ",
  body: "`SCONJ` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/entity/lemma/lexeme/) und ist über [POS](/de/entity/lemma/lexeme/) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [ConjType](/de/feature/conj-type/)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
