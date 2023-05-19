import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loadingAtom = atom({
	key: "loadingAtom",
	default: false,
	effects_UNSTABLE: [persistAtom],
});
