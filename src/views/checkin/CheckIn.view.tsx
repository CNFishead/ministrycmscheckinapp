"use client";
import React from "react";
import styles from "./CheckIn.module.scss";
import { Button } from "antd";

const CheckIn = () => {
  return (
    <div className={styles.container}>
      <h1>Are you?</h1>
      <Button type="default">Visitor</Button>
      <Button type="primary">Member</Button>
    </div>
  );
};

export default CheckIn;
