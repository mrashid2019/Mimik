import { doc, getDoc } from "firebase/firestore";
import { getDb } from "./db.mjs";

const collection_name = "countries";

export const findOne = async (id) => {
  const d = await getDoc(doc(getDb(), collection_name, id));
  return d.data();
};
