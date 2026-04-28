import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "Lemma-Seite im öffentlichen doc-cite-Baum.",
  family: "entity",
  leaf: "Lemma",
  order: 1001,
  subject: "Lemma",
  title: "Lemma",
  body: "`Lemma` bezeichnet in doc-cite das kanonische Lexikonobjekt mit Lemma-Subkind, Bedeutung und inhärenten Merkmalen.\n\nDie Elternseite [Entity](/de/entity.html) erklärt, wie sich diese Ebene von den beiden anderen öffentlichen Entity-Arten unterscheidet."
});

export default document;
