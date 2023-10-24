import { atom } from "jotai";

interface IUser {
  email: string;
  profilePicture: string;
}

export const isLoggedInAtom = atom<boolean>(false);
export const user = atom<IUser>({
  email: "",
  profilePicture: "",
});
export const allTasksAtom = atom<any>([]);
export const taskToEditAtom = atom<any>({});
export const taskToViewAtom = atom<any>({});

export const authAtom = atom<any>({});
