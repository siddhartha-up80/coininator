import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const customNavbarStyle = {
    minHeight: "10px",
    maxHeight: "40px", // Adjust the height value as per your requirement
  };

  const { data: session } = useSession();

  const { push, asPath } = useRouter();

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/thanks" });

    push(data.url);
  };

  const handleSignIn = () => push(`/auth/signin?callbackUrl=${asPath}`);

  return (
    <div>
      <div className="navbar bg-yellow-500" style={customNavbarStyle}>
        <div className="navbar-start">
          <div className="dropdown dropdown-start">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-8 rounded-full">
                <img
                  src="https://source.unsplash.com/random/100×100/?bitcoin"
                  alt="User"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-max "
            >
              {session ? (
                <>
                  <li>
                    {" "}
                    <button className="btn btn-xs my-1">
                      {session.user.email}
                    </button>
                  </li>
                  <li>
                    {" "}
                    <button className="btn btn-xs my-1" onClick={handleSignOut}>
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button className="btn btn-xs">
                      You are not signed in
                    </button>
                  </li>
                  <li>
                    {" "}
                    <button className="btn btn-xs" onClick={handleSignIn}>
                      Sign in
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a href="/" className="btn btn-ghost normal-case text-xl ">
            Cryptoinator
          </a>
        </div>
        <div className="navbar-end">
          {/* sign in buttons */}
          {session ? (
            <>
              <button className="btn btn-xs " onClick={handleSignOut}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-xs" onClick={handleSignIn}>
                Sign in
              </button>
            </>
          )}
          {/* sign in buttons */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
