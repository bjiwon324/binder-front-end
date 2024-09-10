import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

//추후 수정
export const userAtom = atom<any>(null);
export const adminUser = atom<string>("");
export const loginState = atomWithStorage<boolean>("loginState", false);
