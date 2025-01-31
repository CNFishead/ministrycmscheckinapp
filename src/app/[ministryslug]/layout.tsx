"use client";
import styles from "./layout.module.scss";
import useApiHook from "@/state/useApi";
import { useParams } from "next/navigation";
import Error from "@/components/error/Error.component";
import Loader from "@/components/loader/Loader.component";
import { Divider } from "antd";
import Image from "next/image";

export default function CheckInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // get the ministry id from the url
  const { ministryslug } = useParams();
  const { data, error, status, isError } = useApiHook({
    key: "ministry",
    url: `/ministry/${ministryslug}`,
    method: "GET",
    enabled: !!ministryslug,
  });
  console.log(`API URL: ${process.env.NEXT_PUBLIC_API_URL}`);
  if (status === "pending") {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.container}>
        <Error error={error.message} />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.imageContainer}>
          <Image src={data?.ministry.ministryImageUrl} alt={`${data?.ministry?.name}-logo`} width={200} height={200} />
        </div>
        <h1>{data?.ministry.name}</h1>
      </div>
      <Divider />
      <div className={styles.subContainer} style={{ width: "100%" }}>
        {children}
      </div>
    </div>
  );
}
