import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "ADP-Seite im öffentlichen POS-Baum.",
  family: "pos",
  leaf: "ADP",
  order: 4007,
  subject: "ADP",
  title: "ADP",
  body: "`ADP` ist im deutschen Pack eine öffentliche POS-Unterseite.\n\nSie gehört zur Kategorie [Lexeme](/de/kind/Lexeme.html) und ist über [POS](/de/pos.html) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [Abbr](/de/feature/Abbr.html)\n- [AdpType](/de/feature/AdpType.html)\n- [ExtPos](/de/feature/ExtPos.html)\n- [Foreign](/de/feature/Foreign.html)\n- [GovernedCase](/de/feature/GovernedCase.html)\n- [PartType](/de/feature/PartType.html)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
