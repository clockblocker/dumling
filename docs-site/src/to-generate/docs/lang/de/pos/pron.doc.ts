import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "PRON-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "PRON",
  order: 4013,
  subject: "PRON",
  title: "PRON",
  body: "`PRON` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/kind/Lexeme.html) und ist über [POS](/de/pos.html) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Case](/de/feature/Case.html)\n- [ExtPos](/de/feature/ExtPos.html)\n- [Foreign](/de/feature/Foreign.html)\n- [Gender](/de/feature/Gender.html)\n- [Number](/de/feature/Number.html)\n- [Person](/de/feature/Person.html)\n- [Polite](/de/feature/Polite.html)\n- [Poss](/de/feature/Poss.html)\n- [PronType](/de/feature/PronType.html)\n- [Reflex](/de/feature/Reflex.html)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
