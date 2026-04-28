import { defineSourceMirroredDocPage } from "../../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "Überblick über Selection-Features im öffentlichen doc-cite-Baum.",
  family: "feature-selection",
  order: 8100,
  subject: "selection-features",
  title: "Selection Features",
  body: "Selection-Features beschreiben nicht das Lemma, sondern die Beziehung zwischen markierter Spanne und aufgelöster Surface im konkreten Beleg.\n\nSie sind für doc-cite entscheidend, weil eine Selektion teilweise, orthographisch fehlerhaft oder absichtlich als Variante markiert sein kann, ohne dass sich das zugrunde liegende Lemma ändert.\n\nUnterseiten:\n- [coverage](/de/feature/selection/coverage.html): `coverage` markiert, dass nur ein Teil der aufgelösten Surface im Satz ausgewählt wurde.\n- [orthography](/de/feature/selection/orthography.html): `orthography` markiert, dass die ausgewählte Schreibweise orthographisch fehlerhaft ist.\n- [spelling](/de/feature/selection/spelling.html): `spelling` markiert, dass die Auswahl eine zugelassene nichtkanonische Schreibvariante der aufgelösten Surface ist."
});

export default document;
