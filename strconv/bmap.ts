import * as Reversible from "../Reversible/en";
import * as Format from "./format";
import * as Parse from "./parse";

export const bool = Reversible.tag(Parse.bool, Format.bool as any);
export const list = Reversible.tag(Parse.list, Format.list as any);
export const number = Reversible.tag(Parse.number, Format.number as any);
export const jsonObject = Reversible.tag(Parse.jsonObject, Format.jsonObject as any);
export const jsonValue = Reversible.tag(Parse.jsonValue, Format.jsonValue as any);

const x = Reversible.unwrap(bool);