import React, { useState } from "react";
import { isAuthenticated } from "../../auth/helper";
import Base from "../Base";
import { displayRazorpay } from "./helper/razorpay";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const Checkout = (props) => {
  const classes = useStyles();
  const [data, setData] = useState({ loading: true, error: "", isSuccess: false, address: "", cartItems: props.location.params.cartItems });
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const { token, user } = isAuthenticated();

  const { cartItems } = data;
  const getTotalCartAmount = () => {
    return cartItems.reduce((previousValue, currentValue) => {
      return previousValue + Number(currentValue.quantity) * Number(currentValue.product.price);
    }, 0);
  };

  const openRazorpayPayment = () => {
    const options = {
      amount: getTotalCartAmount(),
      currency: "INR",
    };
    displayRazorpay(user, options, token);
  };

  const getSteps = () => {
    return ["OrderItems", "Shipping Address", "Payment"];
  };
  const steps = getSteps();

  const getOptionalSteps = () => {
    return [];
  };
  const optionalSteps = getOptionalSteps();

  const isStepOptional = (step) => {
    return optionalSteps.includes(step);
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const orderItems = () => {
    return (
      <List>
        {cartItems.length > 0 &&
          cartItems.map((item) => {
            return (
              <ListItem alignItems="center">
                <ListItemAvatar>
                  <Avatar src={item.product.image}></Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.product.name} secondary={item.quantity} />
                <ListItemText
                  primary={Number(item.quantity) * Number(item.product.price).toFixed(2)}
                  secondary={`price : ${item.product.price}`}
                />
              </ListItem>
            );
          })}
      </List>
    );
  };
  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return orderItems();
      case 1:
        return "Shipping Address Step";
      case 2:
        return "Payment Step";
      default:
        return "unknown step";
    }
  };

  const checkoutStepper = () => {
    return (
      <Box className={classes.root}>
        <Paper elevation={3}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = <Typography variant="caption">Optional</Typography>;
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>All steps completed - you&apos;re finished</Typography>
                <Button onClick={handleReset} color="primary" variant="contained" className={classes.button}>
                  Reset
                </Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <div>
                  <Button disabled={activeStep === 0} variant="contained" color="secondary" onClick={handleBack} className={classes.button}>
                    Back
                  </Button>
                  {isStepOptional(activeStep) && (
                    <Button variant="contained" color="primary" onClick={handleSkip} className={classes.button}>
                      Skip
                    </Button>
                  )}

                  <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Paper>
      </Box>
    );
  };
  return (
    <Base title={"Checkout Page"} description="Please provide details to complete the checkout">
      <div>
        {/* <p> Checkout {getTotalCartAmount()} </p>
        <button className="btn btn-primary" onClick={openRazorpayPayment}>
          Pay with Razor Pay
        </button> */}
        {checkoutStepper()}
      </div>
    </Base>
  );
};

export default Checkout;
