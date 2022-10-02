import { Fragment } from "react";
import Navbar from "components/navbar";
import { Outlet } from "react-router-dom";

export default function Wrapper() {
  return (
    <Fragment>
      <Navbar />
      <Outlet />
    </Fragment>
  );
}
