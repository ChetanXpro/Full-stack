import { atom } from "jotai";

export const isLoggedInAtom = atom<boolean>(false);
export const user = atom<any>({});
export const allTasksAtom = atom<any>([]);
export const taskToEditAtom = atom<any>({});

export const authAtom = atom<any>({});
