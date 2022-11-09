import { createContext } from "react";

const ContextProvider = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});
export default ContextProvider;
