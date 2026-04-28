import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "AUX-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "AUX",
  order: 4008,
  subject: "AUX",
  title: "AUX",
  body: "`AUX` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/kind/Lexeme.html) und ist über [POS](/de/pos.html) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [VerbType](/de/feature/VerbType.html)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
