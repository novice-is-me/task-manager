import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

// register (mail and password)
export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    return userCredential.user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const authWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const additionalInfo = getAdditionalUserInfo(userCredential);

    const user = userCredential.user;
    const isNewUser = additionalInfo?.isNewUser;

    return { user, isNewUser };
  } catch (error: any) {
    throw error;
  }
};
