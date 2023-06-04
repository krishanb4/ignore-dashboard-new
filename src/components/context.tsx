import React from "react";

interface MyContextValue {
  data: any;
  setData: (data: any) => void;
}

export const MyContext = React.createContext<MyContextValue>({
  data: "",
  setData: () => {},
});
