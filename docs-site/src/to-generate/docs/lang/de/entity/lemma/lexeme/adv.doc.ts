import { defineLanguageOverlayPage } from "../../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "ADV-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "ADV",
  order: 4002,
  subject: "ADV",
  title: "ADV",
  body: "`ADV` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/entity/lemma/lexeme/) und ist über [POS](/de/entity/lemma/lexeme/) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Degree](/de/feature/degree/)\n- [Foreign](/de/feature/foreign/)\n- [NumType](/de/feature/num-type/)\n- [PronType](/de/feature/pron-type/)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
