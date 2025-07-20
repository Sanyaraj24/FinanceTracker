"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../config/firebase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function GoogleAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authCompleted, setAuthCompleted] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("This is the result => ", result);
      const payload = {
        user_id: user.uid,
        name: user.displayName,
        email: user.email,
        phone: user.phoneNumber,
        photo_url: user.photoURL,
        location: "",
        pincode: "",
      };

      // Send to your backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      setAuthCompleted(true);
    } catch (error) {
      console.error("Google Sign-In error:", error);
      setLoading(false);
    }
  };
  //for auth changes-loading
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && authCompleted) {
        router.push("/");
      }
    });
    //cleanup
    return () => unsubscribe();
  }, [authCompleted, router]);
  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className={`
    w-full flex items-center justify-center gap-3 
    px-4 py-3 rounded-lg border transition-all
    ${
      loading
        ? "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed"
        : `
        bg-white border-gray-300 text-gray-700 
        hover:bg-gray-50 hover:border-gray-400
        active:bg-gray-100 active:scale-[0.98]
      `
    }
    shadow-sm hover:shadow-md active:shadow-sm
  `}
    >
      {loading ? (
        <>
          <div className="h-5 w-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          <span>Signing in...</span>
        </>
      ) : (
        <>
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google logo"
            className="h-5 w-5"
          />
          <span className="font-medium">Continue with Google</span>
        </>
      )}
    </button>
  );
}
