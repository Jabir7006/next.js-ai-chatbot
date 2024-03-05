import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const NavBar = () => {
  return (
    <header className="flex justify-between p-5">
      <div>
        <Link href="/" className="text-2xl font-semibold">
          jabir.ai
        </Link>
      </div>

      <div>
        <UserButton />
      </div>
    </header>
  );
};

export default NavBar;
