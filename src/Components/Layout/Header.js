import React, { Fragment } from "react";
import mealsImg from "../../Assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
function HeaderComponent(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1> Food Store</h1>
        <HeaderCartButton onClick={props.onShowCartHandler} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImg} alt="Meals img" />
      </div>
    </Fragment>
  );
}
export default HeaderComponent;
