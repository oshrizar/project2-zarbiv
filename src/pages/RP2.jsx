import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RP2 = () => {
  const counter = useSelector((bigState) => bigState.counterSlice.counter);
  return (
    <Fragment>
      <h2>{counter}</h2>
      <Link to="/sandBox">SandBox</Link>
    </Fragment>
  );
};

export default RP2;
