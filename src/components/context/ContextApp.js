import React from "react";

const AppContext = React.createContext({});

export const AppContextProvider = (props) => {
  const demo = "demo";
  const fakeAuth = {
    isAuthenticated: false,
    signin(cb) {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      fakeAuth.isAuthenticated = false;
      setTimeout(cb, 100);
    },
  };
  return (
    <AppContext.Provider value={{ demo: demo }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
