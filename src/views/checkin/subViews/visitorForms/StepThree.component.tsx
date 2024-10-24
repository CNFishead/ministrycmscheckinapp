import React from "react";
import styles from "./Visitor.module.scss";
import { Button } from "antd";
import { useInterfaceStore } from "@/state/interface";
import { useParams } from "next/navigation";
import useApiHook from "@/state/useApi";

const StepThree = () => {
  const { setCurrentSignUpStep, visitors } = useInterfaceStore((state) => state);

  const { ministryslug } = useParams();

  const { mutate: checkInVisitor } = useApiHook({
    key: "checkInVisitor",
    url: `/ministry/${ministryslug}/checkin`,
    method: "POST",
    enabled: !!ministryslug,
  }) as any;
  return (
    <div className={styles.buttonContainer}>
      <Button
        className={`${styles.button} ${styles.danger}`}
        onClick={() =>
          checkInVisitor(
            { visitors },
            {
              onSuccess: setCurrentSignUpStep.bind(null, 4),
              onError: (error: any) => {},
            }
          )
        }
      >
        End check-in
      </Button>
      <Button className={`${styles.button} ${styles.success}`} type="primary" onClick={() => setCurrentSignUpStep(3)}>
        Donate
      </Button>
    </div>
  );
};

export default StepThree;
