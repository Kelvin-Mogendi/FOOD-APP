import { useState } from "react";
import Cart from "./Components/Cart/Cart";
import HeaderComponent from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
// import ContextProvider from "./Store/cart-context";
import CartProvider from "./Store/CartProvider";

function App() {
  const [cartIsShown, setcartIsShown] = useState(false);
  function showCartHandler() {
    setcartIsShown(true);
  }
  function hideCartHandler() {
    setcartIsShown(false);
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <HeaderComponent onShowCartHandler={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
