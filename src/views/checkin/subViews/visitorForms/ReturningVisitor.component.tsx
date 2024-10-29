import React from "react";
import styles from "./Visitor.module.scss";
import { useInterfaceStore } from "@/state/interface";
import useApiHook from "@/state/useApi";
import { Avatar, Button, Card, Input } from "antd";
import { clear } from "console";
import { useParams } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import VisitorItem from "../../components/visitorItem/VisitorItem.component";

const { Search } = Input;
const ReturningVisitor = () => {
  const { setVisitors, visitors, selectedFamily, setSelectedFamily, setCurrentSignUpStep } = useInterfaceStore(
    (state) => state
  );
  const [search, setSearch] = React.useState<string>("");
  const [timer, setTimer] = React.useState<any>(null);

  // get the ministry id from the url
  const { ministryslug } = useParams();
  const { data } = useApiHook({
    key: "ministry",
    url: `/ministry/${ministryslug}`,
    method: "GET",
    enabled: !!ministryslug,
  });

  const { data: families, isFetching: familiesFetching } = useApiHook({
    key: ["families", search],
    url: `/family`,
    method: "GET",
    // enabled: !!search,
    filter: `user;${data?.ministry?.user}`,
    keyword: `${search}`,
  }) as any;

  const handleSearch = (value: string) => {
    // set the search value to change after 1 second so its not firing off a request at each key stroke
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        setSearch(value);
      }, 1000)
    );
  };

  React.useEffect(() => {
    // if there are visitors in the visitors array, but the selected family is null,
    // set the selected family to the visitors
    if (visitors.length && !selectedFamily) {
      setSelectedFamily({ name: visitors[0].lastName, members: visitors });
    }
  }, [visitors]);

  return (
    <div>
      {!selectedFamily && visitors.length === 0 && (
        <div className="">
          <Search
            placeholder={`Search for a family`}
            allowClear
            onSearch={handleSearch}
            // rootClassName={styles.search}
            size="large"
            enterButton
            variant="outlined"
            loading={familiesFetching}
          />
          <p>
            If you cannot find your family, or this is your first time here, please click{" "}
            <a href="#" onClick={() => setCurrentSignUpStep(1)}
                style={{ color: "blue", textDecoration: "underline" }}
              >
              here
            </a>
          </p>
          {families?.families?.map((family: any) => (
            <Card
              key={family._id}
              onClick={() => {
                setSelectedFamily(family);
              }}
              style={{
                cursor: "pointer",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {
                  // loop over the members of the family show the first two members and their profile picture
                  family.members.map((member: any, index: number) => {
                    if (index < 2) {
                      return (
                        <div key={member._id}>
                          <Avatar src={member.profileImageUrl} alt={member.name} size={"large"} />
                        </div>
                      );
                    }
                  })
                }
              </div>
              <div style={{ textAlign: "center" }}>{family.name}</div>
            </Card>
          ))}
        </div>
      )}
      {selectedFamily || visitors.length ? (
        <div style={{ margin: "5% 0" }}>
          <div className={styles.subContainer} style={{ margin: "5% 0", gap: "10px" }}>
            <Button
              onClick={() => {
                setSelectedFamily(null);
                setVisitors([]);
              }}
            >
              Back
            </Button>
            <p>Select all the members that are here today to check them in!</p>
          </div>
          {selectedFamily?.members?.map((member: any) => (
            <VisitorItem
              key={member._id}
              member={member}
              onClick={() => {
                // if the member is already in the visitors array remove them
                if (visitors.some((visitor) => visitor._id === member._id)) {
                  setVisitors(visitors.filter((visitor) => visitor._id !== member._id));
                } else {
                  setVisitors([...visitors, member]);
                }
              }}
              checked={visitors.some((visitor) => visitor._id === member._id)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ReturningVisitor;
