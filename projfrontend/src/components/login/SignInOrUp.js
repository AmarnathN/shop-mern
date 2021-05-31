import { MyControls } from "../ui/controls/MyControls";
import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const SignInOrUp = (props) => {
  const tabsList = [
    {
      label: "SignIn",
      component: <SignInForm />,
    },
    {
      label: "SignUp",
      component: <SignUpForm />,
    },
  ];

  return <MyControls.Tabs tabsList={tabsList} />;
};

export default SignInOrUp;
