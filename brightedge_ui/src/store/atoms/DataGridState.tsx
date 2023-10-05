import { atom } from "recoil";

export const tableDataAtom = atom<any[]>({
  key: "tableData", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const urlErrorStateAtom = atom({
  key: "urlErrors",
  default: {},
});
