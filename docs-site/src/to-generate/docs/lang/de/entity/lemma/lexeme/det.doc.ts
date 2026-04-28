import { defineLanguageOverlayPage } from "../../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "DET-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "DET",
  order: 4010,
  subject: "DET",
  title: "DET",
  body: "`DET` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/entity/lemma/lexeme/) und ist über [POS](/de/entity/lemma/lexeme/) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Case](/de/feature/case/)\n- [Definite](/de/feature/definite/)\n- [Degree](/de/feature/degree/)\n- [ExtPos](/de/feature/ext-pos/)\n- [Foreign](/de/feature/foreign/)\n- [Gender](/de/feature/gender/)\n- [Gender[psor]](/de/feature/gender-psor/)\n- [Number](/de/feature/number/)\n- [Number[psor]](/de/feature/number-psor/)\n- [NumType](/de/feature/num-type/)\n- [Person](/de/feature/person/)\n- [Polite](/de/feature/polite/)\n- [Poss](/de/feature/poss/)\n- [PronType](/de/feature/pron-type/)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
