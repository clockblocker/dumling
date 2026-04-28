import { defineSourceMirroredDocPage } from "../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "Überblick über die vier öffentlichen Lemma-Kategorien.",
  family: "kind",
  order: 3000,
  subject: "kind",
  title: "Kind",
  body: "Die Kind-Seiten erklären, welche große Lemma-Kategorie ein Objekt in Dumling hat und in welchem Teilbaum seine konkreten Unterseiten liegen.\n\nDiese Unterscheidung ist für doc-cite zentral, weil die erlaubten Untertypen, Feature-Bags und Attestationsmuster je nach Lemma-Kategorie unterschiedlich sind.\n\nUnterseiten:\n- [Phraseme](/de/kind/Phraseme.html): mehrwortige oder formelhafte Lexeme mit Unterseiten unter /phraseme\n- [Lexeme](/de/kind/Lexeme.html): offene und geschlossene Wortarten, deren öffentliche Unterseiten im POS-Baum liegen\n- [Morpheme](/de/kind/Morpheme.html): gebundene und freie Morphemtypen mit eigenen Unterseiten unter /morpheme\n- [Construction](/de/kind/Construction.html): konstruktionsartige Lemma-Typen mit Unterseiten unter /construction"
});

export default document;
