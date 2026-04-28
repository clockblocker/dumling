import { defineSourceMirroredDocPage } from "../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "Überblick über die Construction-Unterseiten des deutschen Packs.",
  family: "construction",
  order: 7000,
  subject: "construction",
  title: "Construction",
  body: "Die Construction-Seiten bündeln die öffentlichen Untertypen für konstruktionale Lemmas im deutschen Pack.\n\nDiese Unterseiten bündeln die konkreten öffentlichen Blätter, die für doc-cite beim Beschreiben von Lemma-Untertypen relevant sind.\n\nUnterseiten:\n- [Fusion](/de/construction/Fusion.html): Fusion ist eine öffentliche Construction-Unterseite im doc-cite-Baum.\n- [PairedFrame](/de/construction/PairedFrame.html): PairedFrame ist eine öffentliche Construction-Unterseite im doc-cite-Baum."
});

export default document;
