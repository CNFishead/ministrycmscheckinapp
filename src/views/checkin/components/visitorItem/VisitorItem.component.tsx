import React from "react";
import styles from "./VisitorItem.module.scss";
import MemberType from "@/types/MemberType";
import { Avatar, Card } from "antd";
import formatPhoneNumber from "@/utils/formatPhoneNumber";

interface VisitorItemProps {
  member: MemberType;
  checked?: boolean;
  onClick?: () => void;
}
const VisitorItem = ({ member, checked, onClick }: VisitorItemProps) => {
  return (
    <div
      key={member._id}
      className={`${
        // if the member is already in the visitors array add a class to show they are selected
        checked && styles.selected
      } ${styles.container}`}
      onClick={onClick}
    >
      <div className={styles.subContainer}>
        <Avatar src={member.profileImageUrl} alt={member.fullName} size={"large"} />
        <div className={styles.infoContainer}>
            <strong>Name:</strong> <span>{`${member.firstName} ${member.lastName}`}</span>
          </div>

        {member?.email && (
          <div className={styles.infoContainer}>
            <strong>Email Address:</strong> <span>{member?.email}</span>
          </div>
        )}
        {member?.birthday && (
          <div className={styles.infoContainer}>
            <strong>Birthday:</strong> <span>{new Date(member?.birthday).toLocaleDateString()}</span>
          </div>
        )}
        {member?.phoneNumber && (
          <div className={styles.infoContainer}>
            <strong>Phone: </strong>
            <span>{formatPhoneNumber(member?.phoneNumber)}</span>
          </div>
        )}
        {member?.dateLastVisited && (
          <div className={styles.infoContainer}>
            <strong>Last Visited: </strong>
            <span>{new Date(member?.dateLastVisited).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorItem;
