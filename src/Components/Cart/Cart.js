import { useContext } from "react";
import ContextProvider from "../../Store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
function Cart(props) {
  const ctx = useContext(ContextProvider);
  let isTrue = ctx.items.length > 0;

  const totalAmount = `KES - ${ctx.totalAmount.toFixed(2)}`;
  // console.log(totalAmount);
  function cartItemAddHandler(items) {
    ctx.addItem({ ...items, amount: 1 });
  }
  function cartItemRemoveHandler(id) {
    ctx.removeItem(id);
  }
  function onOrder() {
    return (
      <form>
        <input type="text" />
        <input type="text" />
        <input type="text" />
      </form>
    );
  }
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["buttons--alt"]} onClick={props.onClose}>
          Close
        </button>
        {isTrue && (
          <button className={classes.button} onClick={onOrder}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
}
export default Cart;
