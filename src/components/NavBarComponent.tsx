"use client";
import Link from "next/link";
import { IoHomeSharp } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";
import { usePathname } from "next/navigation";

function NavBarComponent() {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  const activeClass =
    "bg-amber-100 text-2xl text-amber-950 p-2 rounded-sm text-center font-bold flex-1 border-b-4 border-amber-600";

  const defaultClass =
    "bg-amber-950 text-2xl text-white p-2 rounded-sm text-center font-bold flex-1 opacity-50";

  return (
    <nav className="bg-amber-950 text-2xl flex text-amber-50 w-full gap-1 p-2 items-center h-16 min-h-16">
      <Link className="p-2" href="/dashboard">
        <IoHomeSharp />
      </Link>

      {isDashboard ? (
        <span className="text-white font-bold flex-1 text-center bg-amber-950">
          <h1 style={{ textShadow: "0 0 10px rgba(255, 215, 0, 1)" }}>
            The Main Quest
          </h1>
        </span>
      ) : (
        <>
          <Link
            className={
              pathname === "/dashboard/body" ? activeClass : defaultClass
            }
            href="/dashboard/body"
          >
            Body
          </Link>
          <Link
            className={
              pathname === "/dashboard/mind" ? activeClass : defaultClass
            }
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
        </>
      )}

      <button
        className="... p-2"
        onClick={() => signOut({ callbackUrl: "/sign-in" })}
      >
        <MdLogout />
      </button>
    </nav>
  );
}

export default NavBarComponent;
