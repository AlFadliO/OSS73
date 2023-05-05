import { Code } from "../constants/code";
import { State } from "../constants/state";

export interface Responce{
    state: State;
    code : Code;
    body : object | undefined;
}