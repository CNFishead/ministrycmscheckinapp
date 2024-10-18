import React from "react";
import styles from "./Visitor.module.scss";
import { SignUpStep } from "@/types/signUpSteps";
import { useInterfaceStore } from "@/state/interface";
import MainWrapper from "@/layouts/mainWrapper/MainWrapper.layout";
import { AnimatePresence, motion } from "framer-motion";
import { Button, message, Steps } from "antd";
import StepOne from "./StepOne.component";
import StepTwo from "./StepTwo.component";
import { useParams } from "next/navigation";
import useApiHook from "@/state/useApi";

const Visitor = () => {
  // get the ministry id from the url
  const { ministryslug } = useParams();
  const { data } = useApiHook({
    key: "ministry",
    url: `/ministry/${ministryslug}`,
    method: "GET",
    enabled: !!ministryslug,
  });
  const {
    currentSignUpStep,
    goBackToPreviousSignUpStep,
    isGoingToPreviousStep,
    advanceToNextSignUpStep,
    visitors,
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
      nextButtonText: "Check In!",
      nextButtonAction: () => {
        // check that the visitors array is not empty, if it is, we dont want to advance to the next step
        if (visitors.length === 0) {
          message.info("Please add at least one visitor before checking in.");
          return;
        }
        // next check if the ministry has a field for donations, if it does, we want to advance to step 2, otherwise, we want to advance to step 3
        if (data?.ministry.donationLink) {
          setCurrentSignUpStep(2);
        } else {
          setCurrentSignUpStep(3);
        }
      },
      previousButtonAction: setCurrentSignUpStep.bind(null, 0),
    },
    2: {
      id: 2,
      title: "",
      headerText: "",
      subHeaderText: "",
      component: <StepTwo />,
      nextButtonText: "",
      nextButtonAction: () => {},
      previousButtonAction: setCurrentSignUpStep.bind(null, 1),
    },
    3: {
      id: 3,
      title: "We're excited to have you visit us today! and appreciate you taking the time to fill out this form.",
      headerText: "Check In",
      subHeaderText: "Please confirm the information below and click the check in button.",
      component: <StepTwo />,
      nextButtonText: "Check In!",
      nextButtonAction: () => {
        // check that the visitors array is not empty, if it is, we dont want to advance to the next step
        if (visitors.length === 0) {
          message.info("Please add at least one visitor before checking in.");
          return;
        }
        advanceToNextSignUpStep();
      },
      previousButtonAction: setCurrentSignUpStep.bind(null, 1),
    },
    4: {
      id: 4,
      title: "We're excited to have you visit us today! and appreciate you taking the time to fill out this form.",
      headerText: "Check In",
      subHeaderText: "Please confirm the information below and click the check in button.",
      component: <StepTwo />,
      nextButtonText: "Check In!",
      nextButtonAction: () => {
        // check that the visitors array is not empty, if it is, we dont want to advance to the next step
        if (visitors.length === 0) {
          message.info("Please add at least one visitor before checking in.");
          return;
        }
        advanceToNextSignUpStep();
      },
      previousButtonAction: setCurrentSignUpStep.bind(null, 1),
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
