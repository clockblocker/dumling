import type { RequireAtLeastOne } from "../../shared";
import type {
    EnMood,
    EnPerson,
    EnTense,
    EnVerbForm,
    EnVoice,
} from "./en-common-enums";

export type EnVerbalInflectionalFeatures = RequireAtLeastOne<{
    mood?: EnMood;
    number?: Extract<import("./en-common-enums").EnNumber, "Plur" | "Sing">;
    person?: EnPerson;
    tense?: EnTense;
    verbForm?: EnVerbForm;
    voice?: EnVoice;
}>;
