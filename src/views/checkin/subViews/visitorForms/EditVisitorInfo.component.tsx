import React from "react";
import styles from "./Visitor.module.scss";
import formStyles from "@/styles/Form.module.scss";
import { useInterfaceStore } from "@/state/interface";
import VisitorItem from "./VisitorItem.component";
import { Button, Form, Input } from "antd";
import MemberForm from "../memberForms/MemberForm.form";
import { useParams } from "next/navigation";
import useApiHook from "@/state/useApi";
import moment from "moment";
import dayjs from "dayjs";
import PhotoUpload from "@/components/photoUpload/PhotoUpload.component";

const EditVisitorInfo = () => {
  const { ministryslug } = useParams();
  const [chosenVisitor, setChosenVisitor] = React.useState<any>(null);
  const { visitors, setVisitors } = useInterfaceStore((state) => state);
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

    // set the chosen visitor to null
    setChosenVisitor(null);
  };

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
      {!chosenVisitor ? (
        <div className={styles.subContainer}>
          {visitors.map((visitor) => (
            <VisitorItem
              key={visitor._id}
              member={visitor}
              onClick={() => {
                console.log(visitor);
                setChosenVisitor(visitor);
              }}
            />
          ))}
        </div>
      ) : (
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
              // country: "United States",
              // state: "Tennessee",
            },
            role: "member",
            checkInLocation: "inPerson",
          }}
        >
          <Form.Item name="_id" hidden>
            <input /> {/* hidden input */}
          </Form.Item>
          <div className={styles.imageUploadContainer}>
            <div className={styles.imageContainer}>
              <PhotoUpload
                name="profileImageUrl"
                listType="picture-card"
                tooltip="Upload a photo of yourself! this is completely optional but it helps church staff identify you in our system!"
                isAvatar={true}
                aspectRatio={1 / 1}
                form={form}
                action={`${process.env.API_URL}/upload`}
                default={chosenVisitor?.profileImageUrl}
                placeholder="Upload a photo of yourself!"
                bodyData={{
                  ministryName: data?.ministry.name,
                }}
              />
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item name="profileImageUrl" label="">
                <Input type="text" placeholder="Member Image http address" className={styles.input} />
              </Form.Item>
            </div>
          </div>
          <MemberForm form={form} ministry={data?.ministry} />
          {/* save button that will save the information */}
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button className={``} type="default" onClick={() => setChosenVisitor(null)}>
              Go Back
            </Button>
            <Button type="primary" onClick={() => handleUpdate()}>
              Update Visitor Information
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default EditVisitorInfo;
