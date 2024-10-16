"use client";
import React from "react";
import styles from "./CheckIn.module.scss";
import { Button } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import Visitor from "./subViews/visitorForms/Visitor.view";

const CheckIn = () => {
  const [selectedView, setSelectedView] = React.useState("visitor");

  // setup the viewHandler to handle the view change
  const getView = () => {
    switch (selectedView) {
      case "visitor":
        return <Visitor />;
      case "member":
        return <div>Member</div>;
      default:
        return (
          <div>
            <h1>Are you?</h1>
            <Button type="default" onClick={() => setSelectedView("visitor")}>
              Visitor
            </Button>
            <Button type="primary" onClick={() => setSelectedView("member")}>
              Member
            </Button>
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <AnimatePresence initial={true} mode="wait">
        <motion.div
          className={styles.auth}
          style={{ width: "100%" }}
          initial={{
            x: 80,
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
          key={selectedView}
        >
          {getView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CheckIn;
