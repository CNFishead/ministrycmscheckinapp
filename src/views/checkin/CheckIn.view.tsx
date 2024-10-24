"use client";
import React from "react";
import styles from "./CheckIn.module.scss";
import { Button, Drawer, FloatButton } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import Visitor from "./subViews/visitorForms/Visitor.view";
import { FaUsers } from "react-icons/fa";
import { useInterfaceStore } from "@/state/interface";
import UserItem from "@/components/userItem/UserItem.component";

const CheckIn = () => {
  const [selectedView, setSelectedView] = React.useState("visitor");
  const [showDrawer, setShowDrawer] = React.useState(false);
  const { visitors, setVisitors, currentSignUpStep } = useInterfaceStore((state) => state);

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
      {currentSignUpStep !== 4 && (
        <FloatButton onClick={() => setShowDrawer(true)} icon={<FaUsers />} badge={{ count: visitors.length }} />
      )}

      <Drawer open={showDrawer} onClose={() => setShowDrawer(false)} width={"50%"}>
        <div className={styles.visitorDrawer__container}>
          <h2>Visitors</h2>
          <p>click to remove...</p>
          {visitors.map((visitor, index) => (
            <UserItem
              user={visitor}
              key={index}
              sm={
                // if device is mobile, return true
                window.innerWidth < 768
              }
              onClick={() => {
                setVisitors(visitors.filter((_, i) => i !== index));
              }}
            />
          ))}
        </div>
      </Drawer>
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
