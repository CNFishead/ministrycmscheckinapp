import React from "react";
import styles from "./Visitor.module.scss";
import formStyles from "@/styles/Form.module.scss";
import { Form, Input, Select, Tooltip, Divider, Button, DatePicker, Drawer } from "antd";
import { states } from "@/data/states";
import { countries } from "@/data/countries";
import MemberType from "@/types/MemberType";
import UserItem from "@/components/userItem/UserItem.component";
import PhotoUpload from "@/components/photoUpload/PhotoUpload.component";
import { useParams } from "next/navigation";
import useApiHook from "@/state/useApi";
import { useInterfaceStore } from "@/state/interface";
import moment from "moment";
import MemberForm from "../memberForms/MemberForm.form";

const StepTwo = () => {
  const [form] = Form.useForm();
  const [showDrawer, setShowDrawer] = React.useState(false);
  // get the ministry id from the url
  const { ministryslug } = useParams();
  const { data } = useApiHook({
    key: "ministry",
    url: `/ministry/${ministryslug}`,
    method: "GET",
    enabled: !!ministryslug,
  });

  const { visitors, setVisitors } = useInterfaceStore((state) => state);

  const addVisitorHandler = (values: MemberType) => {
    // add the visitor to the visitors array
    setVisitors([...visitors, values]);
    form.resetFields();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <Form
            layout="vertical"
            className={formStyles.form}
            form={form}
            initialValues={{
              // firstName: "John",
              // lastName: "Doe",
              // email: "test@test.com",
              // tags: ["gamer", "developer", "musician"],
              sex: "male",
              maritalStatus: "single",
              location: {
                // address: "1234 Main St",
                // city: "Nashville",
                // zipCode: "37211",
                country: "United States",
                // state: "Tennessee",
              },
              role: "member",
              checkInLocation: "inPerson",
            }}
          > 
            <MemberForm form={form} ministry={data?.ministry} />

            {/* save button that will save the information */}
            <div className={formStyles.form__buttonContainer}>
              <Button
                className={formStyles.form__button}
                type="primary"
                onClick={() => addVisitorHandler(form.getFieldsValue())}
              >
                Add Visitor
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default StepTwo;
