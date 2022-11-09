import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
function MealItemForm(props) {
  const amountInputRef = useRef();
  const [AmountIsvalid, setAmountIsvalid] = useState(false);

  function onSubmitHandler(event) {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = Number(amountInputRef.current.value);

    console.log(enteredAmount);
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber > 5 ||
      enteredAmountNumber < 1
    ) {
      setAmountIsvalid(true);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  }

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button> Add</button>
      {AmountIsvalid && <p>Invalid input</p>}
    </form>
  );
}
export default MealItemForm;
