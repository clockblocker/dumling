import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "DET-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "DET",
  order: 4010,
  subject: "DET",
  title: "DET",
  body: "`DET` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/kind/Lexeme.html) und ist über [POS](/de/pos.html) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Case](/de/feature/Case.html)\n- [Definite](/de/feature/Definite.html)\n- [Degree](/de/feature/Degree.html)\n- [ExtPos](/de/feature/ExtPos.html)\n- [Foreign](/de/feature/Foreign.html)\n- [Gender](/de/feature/Gender.html)\n- [Gender[psor]](/de/feature/Gender-psor.html)\n- [Number](/de/feature/Number.html)\n- [Number[psor]](/de/feature/Number-psor.html)\n- [NumType](/de/feature/NumType.html)\n- [Person](/de/feature/Person.html)\n- [Polite](/de/feature/Polite.html)\n- [Poss](/de/feature/Poss.html)\n- [PronType](/de/feature/PronType.html)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
