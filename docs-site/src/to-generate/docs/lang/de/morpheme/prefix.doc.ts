import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "Prefix-Seite im öffentlichen Morpheme-Baum.",
  family: "morpheme",
  leaf: "Prefix",
  order: 5002,
  subject: "Prefix",
  title: "Prefix",
  body: "`Prefix` ist im deutschen Pack eine öffentliche Morpheme-Unterseite.\n\nSie gehört zur Kategorie [Morpheme](/de/kind/Morpheme.html) und ist über [Morpheme](/de/morpheme.html) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [HasSepPrefix](/de/feature/HasSepPrefix.html)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
