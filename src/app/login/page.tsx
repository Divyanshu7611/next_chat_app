"use client";
import Image from "next/image";
import { auth } from "@/lib/firebase";
// import { GoogleAuthProvider } from "firebase/auth/web-extension";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { handleFirebaseLogin } from "../actions/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const provider = new GoogleAuthProvider();
  const handleLogin = async () => {
    console.log("it comes here");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        name: user.displayName ?? "User",
        email: user.email ?? "",
        image: user.photoURL ?? "",
      };

      const res = await handleFirebaseLogin(userData);
      if (res?.success) {
        toast.success("Logged in successfully!");
        router.push("/dashboard");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Login error", error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-indigo-100 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md space-y-8 transition-all duration-300 hover:shadow-indigo-300">
        <div className="text-center">
          <Image
            src="/chat-icon.svg"
            alt="Chat Icon"
            width={60}
            height={60}
            className="mx-auto"
          />
          <h2 className="mt-6 text-4xl font-extrabold text-gray-900">
            Welcome to <span className="text-indigo-600">NextChat</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join premium chat rooms with one click.
          </p>
        </div>

        <button
          onClick={handleLogin}
          className="group relative w-full flex items-center justify-center py-3 px-6 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <svg
            className="h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.4 33.4 29.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.5 5.1 29.5 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20.3-7.5 21-21 .1-1.3.1-2.1 0-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.5l6.6 4.8C14.3 16.1 18.8 13 24 13c3.1 0 6 .9 8.3 2.7l6.2-6.2C34.5 5.1 29.5 3 24 3c-7.9 0-14.7 4.4-17.7 10.9z"
            />
            <path
              fill="#4CAF50"
              d="M24 45c5.2 0 10.1-1.8 13.8-4.9l-6.4-5.3C28.9 36.6 26.5 37 24 37c-5.1 0-9.4-3.3-11-7.8l-6.5 5C9.3 41.4 16.1 45 24 45z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3C34.8 33.3 30 37 24 37c-5.1 0-9.4-3.3-11-7.8l-6.5 5C9.3 41.4 16.1 45 24 45c10.5 0 20.3-7.5 21-21 .1-1.3.1-2.1 0-3.5z"
            />
          </svg>
          Sign in with Google
        </button>

        <div className="mt-8 text-gray-600 text-sm text-center">
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center">
              <span className="text-2xl">🔒</span>
              <span className="mt-1">Secure</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl">⚡</span>
              <span className="mt-1">Fast</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl">🎥</span>
              <span className="mt-1">Video Chat</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
