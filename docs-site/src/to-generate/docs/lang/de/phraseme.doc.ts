import { defineSourceMirroredDocPage } from "../../source-mirrored-doc-pages.ts";

const document = defineSourceMirroredDocPage({
  description: "Überblick über die Phraseme-Unterseiten des deutschen Packs.",
  family: "phraseme",
  order: 6000,
  subject: "phraseme",
  title: "Phraseme",
  body: "Die Phraseme-Seiten bündeln die öffentlichen Untertypen für formelhafte oder idiomatische Lexeme im deutschen Pack.\n\nDiese Unterseiten bündeln die konkreten öffentlichen Blätter, die für doc-cite beim Beschreiben von Lemma-Untertypen relevant sind.\n\nUnterseiten:\n- [DiscourseFormula](/de/phraseme/DiscourseFormula.html): DiscourseFormula ist eine öffentliche Phraseme-Unterseite im doc-cite-Baum.\n- [Aphorism](/de/phraseme/Aphorism.html): Aphorism ist eine öffentliche Phraseme-Unterseite im doc-cite-Baum.\n- [Proverb](/de/phraseme/Proverb.html): Proverb ist eine öffentliche Phraseme-Unterseite im doc-cite-Baum.\n- [Idiom](/de/phraseme/Idiom.html): Idiom ist eine öffentliche Phraseme-Unterseite im doc-cite-Baum."
});

export default document;
