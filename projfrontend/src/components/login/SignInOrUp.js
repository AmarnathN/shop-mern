import { MyControls } from "../ui/controls/MyControls";
import React, { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const SignInOrUp = (props) => {
  const [notify, setNotify] = useState({ isOpen: false, alertMessage: "", alertType: "" });
  const { openPopup = true, handleClosePopup } = props;

  const tabsList = [
    {
      label: "SignIn",
      component: <SignInForm notify={notify} setNotify={setNotify} />,
    },
    {
      label: "SignUp",
      component: <SignUpForm notify={notify} setNotify={setNotify} />,
    },
  ];

  return (
    <div>
      <MyControls.PopupDialog openPopup={openPopup} handleClosePopup={handleClosePopup}>
        <MyControls.Notification notify={notify} setNotify={setNotify} />
        <MyControls.Tabs tabsList={tabsList} />
      </MyControls.PopupDialog>
    </div>
  );
};

export default SignInOrUp;
