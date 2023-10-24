import { atom } from "jotai";

interface IUser {
  email: string;
  profilePicture: string;
}

export const isLoggedInAtom = atom<boolean>(false);
export const user = atom<any>({});
export const allTasksAtom = atom<any>([]);
export const taskToEditAtom = atom<IUser>({
  email: "",
  profilePicture: "",
});

export const authAtom = atom<any>({});
