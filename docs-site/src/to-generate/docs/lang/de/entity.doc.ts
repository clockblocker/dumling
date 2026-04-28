import { defineLanguageOverlayPage } from "../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "Überblick über die öffentlichen Entity-Kategorien von doc-cite.",
  family: "entity",
  order: 1000,
  subject: "entity",
  title: "Entity",
  body: "Diese Übersicht erklärt, welche Art von öffentlichem Objekt doc-cite gerade beschreibt: das Lemma selbst, eine normalisierte Surface oder eine konkrete Selection im Satz.\n\nDumling trennt die Ebenen, weil jede Route eine andere Frage beantwortet: Was ist das Lexikonobjekt, wie sieht seine normalisierte Oberfläche aus, und welche Spanne wurde im Beleg tatsächlich markiert?"
});

export default document;
