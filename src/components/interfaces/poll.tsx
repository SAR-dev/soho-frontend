import { Choice } from "./post";

export interface ChoicePostDataInterface {
    choices?: Choice[];
    choices_voted?: number;
    postId: number;
}