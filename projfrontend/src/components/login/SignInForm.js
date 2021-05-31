import { Grid } from "@material-ui/core";
import React from "react";
import { Redirect } from "react-router";
import { authenticate, isAuthenticated, signin } from "../../auth/helper";
import { MyControls } from "../ui/controls/MyControls";

const intialFieldValues = {
  email: "a8@test.com",
  password: "a008@1",
  error: "",
  didRedirect: false,
};

const SignInForm = (props) => {
  const {} = props;
  const { user } = isAuthenticated();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("email" in fieldValues) {
      temp.email = /$^|.+@+..+/.test(fieldValues.email) ? "" : "Valid Email is required";
    }

    if ("password" in fieldValues) {
      temp.password = fieldValues.password.length > 0 ? "" : "This field is required";
    }
    setErrors({
      ...temp,
    });
    if (fieldValues === values) {
      return Object.values(temp).every((x) => x == "");
    }
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = MyControls.useForm(intialFieldValues, true, validate);

  const performRedirect = () => {
    if (values.didRedirect) {
      if (user && user.role == 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signin({ email: values.email, password: values.password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, email: "", password: "", error: false, loading: false, didRedirect: true });
          });
        }
      })
      .catch((error) => {
        console.log("Error in Signin : " + error);
      });
  };

  return (
    <MyControls.Form onSubmit={handleSubmit}>
      <Grid container justify={"center"} align="center">
        <Grid item sm={12} xs={12}>
          <MyControls.Input label="Email" value={values.email} onChange={handleInputChange} name="email" errorText={errors.email} />
          <MyControls.Input
            label="Password"
            value={values.password}
            onChange={handleInputChange}
            name="password"
            errorText={errors.password}
            type="password"
          />
        </Grid>
        <MyControls.Button color={"secondary"} text={"SignIn"} type={"submit"} size={"medium"} />
      </Grid>

      {performRedirect()}
    </MyControls.Form>
  );
};

export default SignInForm;
