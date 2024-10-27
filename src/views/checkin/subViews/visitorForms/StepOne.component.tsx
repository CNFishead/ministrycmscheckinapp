import React from "react";
import styles from "./Visitor.module.scss";
import { Button } from "antd";
import { useInterfaceStore } from "@/state/interface";

const StepOne = () => {
  const { setCurrentSignUpStep } = useInterfaceStore((state) => state);
  return (
    <div className={styles.buttonContainer}>
      <Button className={`${styles.button} ${styles.new}`} onClick={() => setCurrentSignUpStep(1)} type="dashed">
        New Visitor
      </Button>
      <Button className={`${styles.button} ${styles.returning}`} type="primary" onClick={() => setCurrentSignUpStep(5)}>
        Returning Visitor
      </Button>
    </div>
  );
};

export default StepOne;
