import { defineLanguageOverlayPage } from "../../../../../source-mirrored-doc-pages.ts";

const document = defineLanguageOverlayPage({
  description: "Prefix-Seite im öffentlichen Morpheme-Baum.",
  family: "morpheme",
  leaf: "Prefix",
  order: 5002,
  subject: "Prefix",
  title: "Prefix",
  body: "`Prefix` ist im deutschen Pack eine öffentliche Morpheme-Unterseite.\n\nSie gehört zur Kategorie [Morpheme](/de/entity/lemma/morpheme/) und ist über [Morpheme](/de/entity/lemma/morpheme/) einsortiert.",
  subsections: [
    {
      body: "Relevante grammatische Feature-Seiten:\n- [HasSepPrefix](/de/feature/has-sep-prefix/)",
      examples: [],
      heading: "Verknüpfte Features"
    }
  ]
});

export default document;
