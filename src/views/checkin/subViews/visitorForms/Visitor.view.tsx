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
import StepThree from "./StepThree.component";
import StepFour from "./StepFour.component";
import StepFinal from "./StepFinal.component";

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
      buttonStyling: styles.button,
      nextButtonStyling: styles.success,
      hideBackButton: true,
      hideNextButton: true,
    },
    1: {
      id: 1,
      title: "We're excited to have you visit us today! and appreciate you taking the time to fill out this form.",
      headerText: "New Visitor",
      subHeaderText: "Please fill out the form below to check in.",
      component: <StepTwo />,
      buttonStyling: styles.button,
      nextButtonStyling: styles.success,
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
      title: "Step three",
      headerText: "We appreciate you taking the time to fill out this form.",
      subHeaderText: "Would you like to give your donation to the church today online?",
      component: <StepThree />,
      buttonStyling: styles.button,
      nextButtonStyling: styles.success,
      hideBackButton: true,
      hideNextButton: true,
    },
    3: {
      id: 3,
      title: "Donation",
      headerText: "Thanks for you donation!",
      subHeaderText: "When you are finished hit the end check-in button!",
      component: <StepFour />,
      nextButtonText: "End Check-In!",
      buttonStyling: styles.button,
      nextButtonStyling: styles.success,
      nextButtonAction: () => {
        // check that the visitors array is not empty, if it is, we dont want to advance to the next step
        if (visitors.length === 0) {
          message.info("Please add at least one visitor before checking in.");
          return;
        }
        advanceToNextSignUpStep();
      },
      previousButtonAction: setCurrentSignUpStep.bind(null, 2),
    },
    4: {
      id: 4,
      title: "Finish",
      // headerText: "Check-in complete!",
      // subHeaderText: "We're happy you joined us today! and hope to see you again soon. Enjoy the service!",
      component: <StepFinal />,
      nextButtonText: "Finish and close",
      backButtonText: !data?.ministry.donationLink ? "Back to Donation Giving" : "Visitor Sign-In",
      buttonStyling: styles.button,
      nextButtonStyling: styles.success,
      hideNextButton: true,
      nextButtonAction: () => {
        window.close();
      },
      previousButtonAction: !data?.ministry.donationLink
        ? setCurrentSignUpStep.bind(null, 3)
        : setCurrentSignUpStep.bind(null, 1),
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
            title={steps[currentSignUpStep]?.headerText ?? ""}
            description={steps[currentSignUpStep]?.subHeaderText ?? ""}
          >
            {steps[currentSignUpStep]?.component}
          </MainWrapper>

          <div className={styles.buttons}>
            {!steps[currentSignUpStep]?.hideBackButton && (
              <Button
                type="text"
                onClick={steps[currentSignUpStep]?.previousButtonAction || goBackToPreviousSignUpStep}
                disabled={steps[currentSignUpStep]?.backButtonDisabled}
                className={`${steps[currentSignUpStep]?.buttonStyling} ${steps[currentSignUpStep]?.backButtonStyling}`}
              >
                {steps[currentSignUpStep]?.backButtonText || "Back"}
              </Button>
            )}
            {!steps[currentSignUpStep]?.hideNextButton && (
              <Button
                type="primary"
                onClick={() => {
                  steps[currentSignUpStep]?.nextButtonAction!();
                }}
                disabled={steps[currentSignUpStep]?.nextButtonDisabled}
                className={`${steps[currentSignUpStep]?.buttonStyling} ${steps[currentSignUpStep]?.nextButtonStyling}`}
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
