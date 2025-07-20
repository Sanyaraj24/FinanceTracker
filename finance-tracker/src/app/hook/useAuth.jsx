'use client';

import { onAuthStateChanged } from "firebase/auth";
import { useState,useEffect } from "react";
import { auth } from "../config/firebase";
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //onAuthStateChanged is a Firebase Authentication method
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    //Cleanupp subscription
    return unsubscribe;
  }, []);
  return { user, loading };
};

export default useAuth;
