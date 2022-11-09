import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import ContextProvider from "../../Store/cart-context";
function HeaderCartButton(props) {
  // function clickHandler() {}
  const ctx = useContext(ContextProvider);
  const numberOfItems = ctx.items.reduce((acc, item) => {
    // console.log(ctx.items[0].amount);
    // console.log(ctx.items);
    return acc + ctx.items[0].amount;
  }, 0);
  const { items } = ctx;
  const [isHighlighted, setIsHighlighted] = useState(false);
  const btnClasses = `${classes.button} ${isHighlighted ? classes.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsHighlighted(true);
    const timer = setTimeout(() => {
      setIsHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
}
export default HeaderCartButton;
