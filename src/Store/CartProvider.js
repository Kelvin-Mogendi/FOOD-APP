// import { useContext } from "react";
import { useReducer } from "react";
import ContextProvider from "./cart-context";

const CartState = {
  items: [],
  totalAmount: 0,
};

function reducerFN(state, action) {
  if (action.type === "ADD") {
    const updatedAmount =
      state.totalAmount + action.items.price * action.items.amount;
    const existingCartIndex = state.items.findIndex((item) => {
      return item.id === action.items.id;
    });
    const existingCartItem = state.items[existingCartIndex];
    let updatedItems;
    let updatedItem;

    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.items.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartIndex] = updatedItem;
    } else {
      // updatedItem = { ...action.items };
      updatedItems = state.items.concat(action.items);
    }

    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  if (action.type === "Remove") {
    const existingCartIndex = state.items.findIndex((item) => {
      return item.id === action.id;
    });
    const existingCartItem = state.items[existingCartIndex];
    const updatedAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    let updatedItem;

    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  return CartState;
}

function CartProvider(props) {
  const [curState, dispatchCartFN] = useReducer(reducerFN, CartState);
  function addItemToCartHandler(items) {
    dispatchCartFN({ type: "ADD", items: items });
  }
  function removeItemFromCartHandler(id) {
    dispatchCartFN({ type: "Remove", id: id });
  }

  const cartProviderCtx = {
    items: curState.items,
    totalAmount: curState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <ContextProvider.Provider value={cartProviderCtx}>
      {props.children}
    </ContextProvider.Provider>
  );
}
export default CartProvider;
