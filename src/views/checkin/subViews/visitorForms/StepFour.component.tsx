import useApiHook from "@/state/useApi";
import { useParams } from "next/navigation";
import React from "react";

const StepFour = () => {
  // get the ministry id from the url
  const { ministryslug } = useParams();
  const { data } = useApiHook({
    key: "ministry",
    url: `/ministry/${ministryslug}`,
    method: "GET",
    enabled: !!ministryslug,
  });
  return (
    <div>
      <iframe src={data?.ministry.donationLink} style={{ width: "100%", height: "100dvh" }} />
    </div>
  );
};

export default StepFour;
