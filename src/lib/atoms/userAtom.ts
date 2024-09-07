import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

//추후 수정
export const userAtom = atom<any>(null);
export const adminUser = atom<string>("");
export const loginState = atomWithStorage<boolean>("loginState", false);

//user 위치, 초기 위치 네이버 본사
export const userCoordinate = atomWithStorage("coordinate", { x: 37.3595704, y: 127.105399 });
