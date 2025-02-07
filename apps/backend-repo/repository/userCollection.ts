import { getFirestore } from "../config";

const db = getFirestore();

export const userCollection = db.collection("users");
export const totalUserCollection = db.collection("totalUsers");
