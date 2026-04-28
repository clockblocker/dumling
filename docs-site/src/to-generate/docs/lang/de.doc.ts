import { defineSourceMirroredDocPage } from "../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "Root-Überblick für den öffentlichen de-doc-cite-Baum.",
  family: "scope",
  order: 100,
  subject: "de",
  title: "de",
  body: "Diese Überblicksseite bündelt die öffentlichen doc-cite-Routen für den Scope `de`.\n\nDie Familienseiten darunter trennen Entity-Ebenen, Lemma-Kategorien, konkrete Inventare und öffentliche Feature-Routen, damit jede URL genau eine Navigationsaufgabe übernimmt.\n\nUnterseiten:\n- [Entity](/de/entity.html): Überblick über Lemma, Surface und Selection als öffentliche Entity-Arten.\n- [Surface](/de/surface.html): Überblick über Citation- und Inflection-Surfaces.\n- [Kind](/de/kind.html): Überblick über die vier Lemma-Kategorien.\n- [POS](/de/pos.html): Inventarseiten für lexemische Wortarten.\n- [Morpheme](/de/morpheme.html): Inventarseiten für Morphem-Untertypen.\n- [Phraseme](/de/phraseme.html): Inventarseiten für formelhafte Lemmas.\n- [Construction](/de/construction.html): Inventarseiten für konstruktionale Lemmas.\n- [Feature](/de/feature.html): Überblick über grammatische, Selection- und Surface-Features."
});

export default document;
