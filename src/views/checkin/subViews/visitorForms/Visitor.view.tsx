import React from "react";
import styles from "./Visitor.module.scss";
import { SignUpStep } from "@/types/signUpSteps";
import { useInterfaceStore } from "@/state/interface";
import MainWrapper from "@/layouts/mainWrapper/MainWrapper.layout";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Steps } from "antd";
import StepOne from "./StepOne.component";
import StepTwo from "./StepTwo.component";

const Visitor = () => {
  const {
    currentSignUpStep,
    goBackToPreviousSignUpStep,
    isGoingToPreviousStep,
    advanceToNextSignUpStep,
    setCurrentSignUpStep,
  } = useInterfaceStore((state) => state);
  const steps: {
    [key: number]: SignUpStep;
  } = {
    0: {
      id: 0,
      title: "Visitor",
      headerText: "We're excited to have you visit us today!",
      subHeaderText: "Are you a returning visitor or a new visitor? Please select the option that best describes you.",
      component: <StepOne />,
      hideBackButton: true,
      hideNextButton: true,
    },
    1: {
      id: 1,
      title: "We're excited to have you visit us today! and appreciate you taking the time to fill out this form.",
      headerText: "New Visitor",
      subHeaderText: "Please fill out the form below to check in.",
      component: <StepTwo />,
      nextButtonText: "Next",
      nextButtonAction: setCurrentSignUpStep.bind(null, 3),
      previousButtonAction: setCurrentSignUpStep.bind(null, 0),
    },
  };

  return (
    <div>
      <AnimatePresence initial={true} mode="wait">
        <motion.div
          className={styles.container}
          initial={{
            x: isGoingToPreviousStep ? -80 : 80,
            opacity: 0,
            scale: 0.99,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            ease: "easeInOut",
            duration: 0.3,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
          }}
          key={currentSignUpStep}
        >
          <MainWrapper
            title={steps[currentSignUpStep]?.headerText}
            description={steps[currentSignUpStep]?.subHeaderText}
          >
            {steps[currentSignUpStep]?.component}
          </MainWrapper>

          <div className={styles.buttons}>
            {!steps[currentSignUpStep]?.hideBackButton && (
              <Button
                type="text"
                className={styles.backButton}
                onClick={steps[currentSignUpStep]?.previousButtonAction || goBackToPreviousSignUpStep}
              >
                Back
              </Button>
            )}
            {!steps[currentSignUpStep]?.hideNextButton && (
              <Button
                type="primary"
                onClick={() => {
                  steps[currentSignUpStep]?.nextButtonAction!();
                }}
                disabled={steps[currentSignUpStep]?.nextButtonDisabled}
                className={styles.nextButton}
              >
                {steps[currentSignUpStep]?.nextButtonText || "Next"}
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Visitor;
