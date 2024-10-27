import React from "react";
import styles from "./Visitor.module.scss";
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
    <Card
      key={member._id}
      className={`${
        // if the member is already in the visitors array add a class to show they are selected
        checked && styles.selected
      } ${styles.memberItem}`}
      onClick={onClick}
    >
      <div className={styles.subContainer}>
        <Avatar src={member.profileImageUrl} alt={member.fullName} size={"large"} />
        <span>{`${member.firstName} ${member.lastName}`}</span>

        {member?.email && (
          <div>
            <strong>Email Address:</strong> <span>{member?.email}</span>
          </div>
        )}
        {member?.birthday && (
          <div>
            <strong>Birthday:</strong> <span>{new Date(member?.birthday).toLocaleDateString()}</span>
          </div>
        )}
        {member?.phoneNumber && (
          <div>
            <strong>Phone: </strong>
            <span>{formatPhoneNumber(member?.phoneNumber)}</span>
          </div>
        )}
        {member?.dateLastVisited && (
          <div>
            <strong>Last Visited: </strong>
            <span>{new Date(member?.dateLastVisited).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default VisitorItem;
