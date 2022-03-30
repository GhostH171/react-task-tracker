import React, { createContext, useContext, useState } from "react";
const fakeAuth = {
  isAuthenticated: false,
  signin() {
    fakeAuth.isAuthenticated = true;
  },
  signout() {
    fakeAuth.isAuthenticated = false;
  },
};
const authContext = createContext();
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export function useAuth() {
  return useContext(authContext);
}
function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (obj) => {
    console.log(obj);
    return fakeAuth.signin(() => {
      setUser(obj);
    });
  };

  const signout = () => {
    return fakeAuth.signout(() => {
      setUser(null);
    });
  };

  return {
    user,
    signin,
    signout,
  };
}
