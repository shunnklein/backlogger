"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: userSession, status } = useSession();
  return (
    <header className="w-full bg-white shadow-md py-4 px-8">
      <nav className="flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
        >
          Superblog
        </Link>
        <div className="space-x-4">
          <Link href="/posts" className="text-blue-600 hover:underline">
            Posts
          </Link>
          <Link href="/posts/new" className="text-blue-600 hover:underline">
            New Post
          </Link>
          <Link
            href="/users/new"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            New User
          </Link>
          {status === "authenticated" ?
            <div className="flex flex-col items-center justify-center">
              <p>Welcome, {userSession?.user?.name}!</p>
              <button
                onClick={() => signOut()}
                className="cursor-pointer hover:text-gray-600"
              >
                Sign out
              </button>
            </div>
          : <button
              onClick={() => signIn("google")}
              className="cursor-pointer  hover:text-gray-600"
            >
              Sign in with Google
            </button>
          }
        </div>
      </nav>
    </header>
  );
}
