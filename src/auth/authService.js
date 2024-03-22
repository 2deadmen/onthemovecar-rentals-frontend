import { createUser } from "../api/userLogin";
import { auth } from "../firebaseConfig";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

export const Google = async (e) => {
  //   var logger = 0;
  var checker = null;
  await signInWithPopup(auth, provider).then(async (result) => {

    checker={
      name:result.user.displayName,
      email:result.user.email,
      password:result.user.email
    }
    
    // localStorage.setItem("token", data.data.token);

    // return checker
  });
  return checker;
};
