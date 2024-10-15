"use client";
import styles from "./layout.module.scss";
import useApiHook from "@/state/useApi";
import { useParams } from "next/navigation";
import Error from "@/components/error/Error.component";
import Loader from "@/components/loader/Loader.component";
import { Divider } from "antd";
import Image from "next/image";

export default function RootLayout({
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

  if (status === "pending") {
    return (
      <html lang="en">
        <body>
          <div className={styles.container}>
            <Loader />
          </div>
        </body>
      </html>
    );
  }
  if (isError) {
    return (
      <html lang="en">
        <body>
          <div className={styles.container}>
            <Error error={error.message} />
          </div>
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          <div className={styles.subContainer}>
            <div className={styles.imageContainer}>
              <Image src={data?.ministry.ministryImageUrl} alt={data?.name} width={200} height={200} />
            </div>
            <h1>{data?.ministry.name}</h1>
            <p>We're excited to have you join us today! please check-in so we know your here!</p>
          </div>
          <Divider />
          {children}
        </div>
      </body>
    </html>
  );
}
