import React from "react";
import styles from "./Visitor.module.scss";
import { Button } from "antd";
import { useInterfaceStore } from "@/state/interface";

const StepThree = () => {
  const { setCurrentSignUpStep } = useInterfaceStore((state) => state);

  return (
    <div className={styles.buttonContainer}>
      <Button className={`${styles.button} ${styles.danger}`} onClick={() => setCurrentSignUpStep(4)}>
        End check-in
      </Button>
      <Button className={`${styles.button} ${styles.success}`} type="primary" onClick={() => setCurrentSignUpStep(3)}>
        Donate
      </Button>
    </div>
  );
};

export default StepThree;
