import { defineSourceMirroredDocPage } from "../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "Überblick über Citation- und Inflection-Surfaces.",
  family: "surface",
  order: 2000,
  subject: "surface",
  title: "Surface",
  body: "Surface-Seiten beschreiben die normalisierte sichtbare Form, die auf ein Lemma verweist und die Grundlage für Selections bildet.\n\nDie Trennung zwischen Citation und Inflection ist für doc-cite wichtig, weil Selection-Auflösungen entweder direkt auf eine zitierfähige Form oder auf eine flektierte Surface mit zusätzlichen Merkmalen zeigen.\n\nUnterseiten:\n- [Citation](/de/surface/Citation.html): die zitierfähige, normalisierte Surface eines Lemmas ohne inflectionalFeatures\n- [Inflection](/de/surface/Inflection.html): eine konkrete flektierte Surface mit inflectionalFeatures für das aufgelöste Lemma"
});

export default document;
