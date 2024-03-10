import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const NavBar = () => {
  return (
    <header className="flex justify-between p-5">
      <div>
        <Link href="/" className="text-2xl font-semibold">
          jabir.ai
        </Link>
      </div>

      <SignedIn>
        <UserButton />
      </SignedIn>

      <SignedOut>
        <Link
          href="/sign-in"
          className="text-gray-200 font-semibold py-2 px-5 bg-gray-800 shadow-sm  hover:shadow-xl shadow-black/50 rounded-lg"
        >
          Sign In
        </Link>
      </SignedOut>
    </header>
  );
};

export default NavBar;
