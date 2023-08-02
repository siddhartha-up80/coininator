import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

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
        <div className="navbar-start"></div>
        <div className="navbar-center">
          <a href="/" className="btn btn-ghost normal-case text-xl ">
            Cryptoinator
          </a>
        </div>
        <div className="navbar-end">
          {/* sign in buttons */}
          {session ? (
            <>
              <div>Signed in as {session.user.email}</div>
              <button onClick={handleSignOut}>Sign out</button>
            </>
          ) : (
            <>
              <heading>You are not signed in</heading>

              <button onClick={handleSignIn}>Sign in</button>
            </>
          )}
          {/* sign in buttons */}

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-8 rounded-full">
                <img
                  src="https://source.unsplash.com/random/100×100/?bitcoin"
                  alt="User"
                />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
