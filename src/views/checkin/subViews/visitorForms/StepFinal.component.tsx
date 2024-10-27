import React from "react";
import styles from "./Visitor.module.scss";
import UserItem from "@/components/userItem/UserItem.component";
import { useInterfaceStore } from "@/state/interface";
import VisitorItem from "./VisitorItem.component";

const StepFinal = () => {
  const { visitors } = useInterfaceStore((state) => state);
  return (
    <div>
      <div className={styles.container} style={{ margin: "2% 0" }}>
        {/* you may close this window prompt */}
        <h2>Thank you for visiting!</h2>
        <p>
          You may now <span style={{ color: "red", fontStyle: "italic", fontWeight: "bold" }}>close</span> this window.
        </p>
      </div>
      <div className={styles.container}>
      <p>Visitors checked in: </p>
        {visitors.map((visitor, index) => (
          <div key={index} style={{width: '100%'}}>
            <VisitorItem member={visitor} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepFinal;
