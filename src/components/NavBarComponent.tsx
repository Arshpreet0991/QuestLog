"use client";
import Link from "next/link";
import { IoHomeSharp } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import { usePathname } from "next/navigation";

function NavBarComponent() {
  const pathname = usePathname();
  const activeClass =
    "bg-amber-600 text-2xl text-white p-2 rounded-sm text-center font-bold flex-5";
  const defaultClass =
    "bg-amber-950 text-2xl text-white p-2 rounded-sm text-center font-bold flex-5";
  return (
    <nav className="bg-black text-2xl flex text-black w-full mb-10 gap-1 p-1 h-16 items-center">
      <Link
        className="bg-amber-950 text-2xl text-white p-3 w-3xs rounded-sm text-center font-bold flex-1 flex items-center justify-center"
        href="/dashboard"
      >
        <IoHomeSharp />
      </Link>
      <Link
        className={pathname === "/dashboard/body" ? activeClass : defaultClass}
        href="/dashboard/body"
      >
        Body
      </Link>
      <Link
        className={pathname === "/dashboard/mind" ? activeClass : defaultClass}
        href="/dashboard/mind"
      >
        Mind
      </Link>
      <Link
        className={
          pathname === "/dashboard/wealth" ? activeClass : defaultClass
        }
        href="/dashboard/wealth"
      >
        Wealth
      </Link>
      <button
        className="bg-amber-950 text-2xl text-white p-3 w-3xs rounded-sm text-center font-bold flex-1 flex items-center justify-center"
        onClick={() => signOut({ callbackUrl: "/sign-in" })}
      >
        <MdLogout />
      </button>
    </nav>
  );
}

export default NavBarComponent;
