import React from "react";
import styles from "./Visitor.module.scss";
import formStyles from "@/styles/Form.module.scss";
import { useInterfaceStore } from "@/state/interface";
import VisitorItem from "../../components/visitorItem/VisitorItem.component";
import { Button, Form, Input, Select } from "antd";
import MemberForm from "../memberForms/MemberForm.form";
import { useParams } from "next/navigation";
import useApiHook from "@/state/useApi";
import dayjs from "dayjs";
const EditVisitorInfo = () => {
  const { ministryslug } = useParams();
  const [chosenVisitor, setChosenVisitor] = React.useState<any>(null);
  const { visitors, setVisitors, selectedFamily, formValues, setFormValues } = useInterfaceStore((state) => state);
  const [form] = Form.useForm();
  const { data } = useApiHook({
    key: "ministry",
    url: `/ministry/${ministryslug}`,
    method: "GET",
    enabled: !!ministryslug,
  });

  const handleUpdate = () => {
    // get the form values
    const values = form.getFieldsValue();

    // check if the chosen visitor is part of the visitors array already
    // if they are, update them, if not add them to the array
    if (!chosenVisitor?._id) {
      setVisitors([
        ...visitors,
        {
          ...values,
          birthday: values.birthday ? dayjs(values.birthday).toISOString() : null,
        },
      ]);
    } else {
      // set the visitors array to the updated visitors array
      setVisitors(
        visitors.map((visitor) => {
          if (visitor._id === values._id) {
            return {
              ...visitor,
              ...values,
              birthday: values.birthday ? dayjs(values.birthday).toISOString() : null,
            };
          }
          return visitor;
        })
      );
    }

    // set the chosen visitor to null
    setChosenVisitor(null);
  };
  console.log(chosenVisitor);
  React.useEffect(() => {
    // if the chosen visitor is not null, set the form values to the chosen visitor
    if (chosenVisitor) {
      form.setFieldsValue({
        ...chosenVisitor,
        birthday: chosenVisitor.birthday ? dayjs(chosenVisitor.birthday) : null,
      });
    }
  }, [chosenVisitor]);

  return (
    <div className={styles.container}>
      <div style={{ margin: "2% 0" }}>
        <Button
          className={`${styles.button} ${styles.success}`}
          type="primary"
          onClick={() => {
            setChosenVisitor({});
          }}
        >
          Add New Visitor
        </Button>
      </div>
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
          familyName: selectedFamily?.name,
        }}
      >
        <Form.Item name="familyName">
          <Input type="text" placeholder="Family Name" className={styles.input} readOnly disabled />
        </Form.Item>

        {!chosenVisitor ? (
          <div className={styles.subContainer}>
            <div className="">
              {visitors.map((visitor) => (
                <VisitorItem
                  key={visitor._id}
                  member={visitor}
                  onClick={() => {
                    setChosenVisitor(visitor);
                  }}
                  sm={true}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            {chosenVisitor?._id && (
              <Form.Item name="_id" hidden>
                <input /> {/* hidden input */}
              </Form.Item>
            )}
            <MemberForm form={form} ministry={data?.ministry} />
            {/* save button that will save the information */}
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button
                className={`${styles.button} ${styles.danger}`}
                type="default"
                onClick={() => {
                  setChosenVisitor(undefined);
                  form.resetFields();
                }}
              >
                Go Back
              </Button>
              <Button type="primary" onClick={() => handleUpdate()} className={`${styles.button} ${styles.success}`}>
                {Object.keys(chosenVisitor).length === 0 ? "Add Member" : "Update Visitor Information"}
              </Button>
            </div>
          </>
        )}
      </Form>
      {/* check in location handler, asks the user how they are checking in today */}
      <Select
        placeholder="How are you checking in today?"
        onChange={(value) => setFormValues({ ...formValues, checkInLocation: value })}
        style={{ width: "100%", margin: "5% 0" }}
        defaultValue={`in-person`}
      >
        <Select.Option value="in-person">In Person</Select.Option>
        <Select.Option value="online">Online</Select.Option>
        <Select.Option value="event">Event Check In</Select.Option>
      </Select>
    </div>
  );
};

export default EditVisitorInfo;
