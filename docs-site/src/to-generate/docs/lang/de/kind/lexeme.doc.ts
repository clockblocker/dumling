import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "Lexeme-Seite im öffentlichen Lemma-Baum.",
  family: "kind",
  leaf: "Lexeme",
  order: 3002,
  subject: "Lexeme",
  title: "Lexeme",
  body: "`Lexeme` bezeichnet offene und geschlossene Wortarten, deren öffentliche Unterseiten im POS-Baum liegen.\n\nDie konkrete Inventarseite für diese Kategorie steht unter [POS](/de/pos.html)."
});

export default document;
