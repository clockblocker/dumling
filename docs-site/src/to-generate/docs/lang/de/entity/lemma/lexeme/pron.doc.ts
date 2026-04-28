import { defineLanguageOverlayPage } from "../../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "PRON-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "PRON",
  order: 4013,
  subject: "PRON",
  title: "PRON",
  body: "`PRON` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/entity/lemma/lexeme/) und ist über [POS](/de/entity/lemma/lexeme/) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Case](/de/feature/case/)\n- [ExtPos](/de/feature/ext-pos/)\n- [Foreign](/de/feature/foreign/)\n- [Gender](/de/feature/gender/)\n- [Number](/de/feature/number/)\n- [Person](/de/feature/person/)\n- [Polite](/de/feature/polite/)\n- [Poss](/de/feature/poss/)\n- [PronType](/de/feature/pron-type/)\n- [Reflex](/de/feature/reflex/)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
