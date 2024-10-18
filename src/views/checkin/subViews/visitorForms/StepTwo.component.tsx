import React from "react";
import styles from "./Visitor.module.scss";
import formStyles from "@/styles/Form.module.scss";
import { Form, Input, Select, Tooltip, Divider, Button } from "antd";
import { states } from "@/data/states";
import { countries } from "@/data/countries";
import MemberType from "@/types/MemberType";
import { address } from "framer-motion/client";
import UserItem from "@/components/userItem/UserItem.component";
import PhotoUpload from "@/components/photoUpload/PhotoUpload.component";
import { useParams } from "next/navigation";
import useApiHook from "@/state/useApi";
import { useInterfaceStore } from "@/state/interface";

const StepTwo = () => {
  const [form] = Form.useForm();
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

  const handleVisitorRemoval = (index: number) => {
    // setVisitors((prev) => prev.filter((_, i) => i !== index));
    setVisitors(visitors.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.leftContainer}>
          <Form
            layout="vertical"
            className={formStyles.form}
            form={form}
            initialValues={{
              firstName: "John",
              lastName: "Doe",
              tags: ["gamer", "developer", "musician"],
              sex: "male",
              maritalStatus: "single",
              location: {
                address: "1234 Main St",
                city: "Nashville",
                zipCode: "37211",
                country: "United States",
                state: "Tennessee",
              },
              role: "member",
              checkInLocation: "inPerson",
            }}
          >
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
                  default={form.getFieldValue("profileImageUrl")}
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

            <div className={formStyles.form__formGroup}>
              <div className={formStyles.form__inputGroup}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input type="email" className={formStyles.form__input} />
                </Form.Item>
              </div>
              <div className={formStyles.form__inputGroup}>
                <Form.Item label="Last Name" name="lastName" rules={[]}>
                  <Input type="email" className={formStyles.form__input} />
                </Form.Item>
              </div>
              <div className={formStyles.form__inputGroup}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[]}
                  tooltip="email isnt required but we would appreciate it if you provide it, we promise not to spam you"
                >
                  <Input type="tel" className={formStyles.form__input} />
                </Form.Item>
              </div>
            </div>
            <div className={formStyles.form__formGroup}>
              <div className={formStyles.form__inputGroup}>
                <Form.Item label="Phone Number" name="phoneNumber" rules={[]}>
                  <Input type="tel" className={formStyles.form__input} />
                </Form.Item>
              </div>
              <div className={formStyles.form__inputGroup}>
                <Form.Item label="Sex" name="sex" rules={[]}>
                  <Select
                    placeholder="Select Gender"
                    className={formStyles.form__input}
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other/Prefer not to say" },
                    ]}
                  />
                </Form.Item>
              </div>

              <div className={formStyles.form__inputGroup}>
                <Form.Item name="maritalStatus" label="Marital Status">
                  <Select placeholder="Marital Status" className={formStyles.input}>
                    <Select.Option value="single">Single</Select.Option>
                    <Select.Option value="married">Married</Select.Option>
                    <Select.Option value="divorced">Divorced</Select.Option>
                    <Select.Option value="widowed">Widowed</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className={formStyles.form__formGroup}>
              <div className={formStyles.form__inputGroup}>
                <Tooltip
                  title="These are short phrases that describe you, they can be anything that you think might be helpful in the church identifying you"
                  placement="topLeft"
                >
                  <Form.Item name="tags" label="Tags/Hobbies" help="values are ( , ) seperated">
                    <Select
                      mode="tags"
                      placeholder="Tags"
                      className={formStyles.input}
                      tokenSeparators={[","]}
                      filterOption={(input: string, option: any) =>
                        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                      }
                    />
                  </Form.Item>
                </Tooltip>
              </div>
            </div>
            <Divider orientation="center">Address Information</Divider>

            <div className={formStyles.form__formGroup}>
              <div className={formStyles.form__inputGroup}>
                <Form.Item name={["location", "address"]} label="Address">
                  <Input type="text" placeholder="Address" className={styles.input} />
                </Form.Item>
              </div>

              <div className={formStyles.form__inputGroup}>
                <Form.Item name={["location", "address2"]} label="Address Cont.">
                  <Input type="text" placeholder="Address Continued" className={styles.input} />
                </Form.Item>
              </div>
            </div>

            <div className={formStyles.form__formGroup}>
              <div className={formStyles.form__inputGroup}>
                <Form.Item name={["location", "city"]} label="City">
                  <Input type="text" placeholder="City" className={styles.input} />
                </Form.Item>
              </div>
              <div className={formStyles.form__inputGroup}>
                <Form.Item name={["location", "state"]} label="State">
                  <Select
                    placeholder="State"
                    showSearch
                    className={styles.input}
                    filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                    options={states.map((state) => ({
                      label: `${state.name} (${state.abbreviation})`,
                      value: state.abbreviation,
                    }))}
                    optionFilterProp="children"
                  ></Select>
                </Form.Item>
              </div>
              <div className={formStyles.form__inputGroup}>
                <Form.Item name={["location", "zipCode"]} label="Zip Code">
                  <Input type="text" placeholder="Zip Code" className={styles.input} />
                </Form.Item>
              </div>
              <div className={formStyles.form__inputGroup}>
                <Form.Item name={["location", "country"]} label="Country">
                  <Select
                    placeholder="Country"
                    showSearch
                    className={styles.input}
                    filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                    options={countries.map((country) => ({ label: `${country}`, value: country }))}
                    optionFilterProp="children"
                    allowClear={true}
                  ></Select>
                </Form.Item>
              </div>
            </div>
            <Divider orientation="center">Role Information</Divider>
            <div className={formStyles.form__formGroup}>
              <div className={formStyles.form__inputGroup}>
                <Form.Item name="role" label="Role">
                  <Select
                    placeholder="Role"
                    className={styles.input}
                    options={[
                      { value: "member", label: "Member" },
                      { value: "visitor", label: "Visitor" },
                    ]}
                  />
                </Form.Item>
              </div>
              <div className={formStyles.form__inputGroup}>
                <Form.Item name="checkInLocation" label="How are you joining us today?">
                  <Select
                    className={styles.input}
                    options={[
                      { value: "online", label: "Online" },
                      { value: "inPerson", label: "In Person" },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>

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
        <div className={styles.rightContainer}>
          <h2>Visitors</h2>
          {visitors.map((visitor, index) => (
            <UserItem user={visitor} key={index} sm onClick={() => handleVisitorRemoval(index)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
