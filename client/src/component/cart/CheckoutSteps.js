import React from 'react'
import { FaShippingFast, } from 'react-icons/fa';
import { MdAccountBalance, MdLibraryAddCheck } from 'react-icons/md';
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core"

function CheckoutSteps({ activeStep }) {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <FaShippingFast />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <MdLibraryAddCheck />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <MdAccountBalance />
        }
    ];

    const stepStyles = {
        boxSizing: "border-box"
    }
    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {
                    steps.map((item, index) => (
                        <Step key={index} active={activeStep === index ? true : false}
                            completed={activeStep >= index ? true : false}
                        >
                            <StepLabel style={{ color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649" }} icon={item.icon}>{item.label}</StepLabel>
                        </Step>
                    ))
                }
            </Stepper>
        </>
    )
}

export default CheckoutSteps