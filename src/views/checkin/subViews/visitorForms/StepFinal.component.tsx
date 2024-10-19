import React from "react";
import styles from "./Visitor.module.scss";
import UserItem from "@/components/userItem/UserItem.component";
import { useInterfaceStore } from "@/state/interface";

const StepFinal = () => {
  const { visitors } = useInterfaceStore((state) => state);
  return (
    <div>
      <div className={styles.container} style={{ margin: "2% 0" }}>
        {/* you may close this window prompt */}
        <h2>Thank you for visiting!</h2>
        <p>You may now close this window.</p>
      </div>
      <p>Visitors checked in: </p>
      {visitors.map((visitor, index) => (
        <div key={index}>
          <UserItem user={visitor} />
        </div>
      ))}
    </div>
  );
};

export default StepFinal;
