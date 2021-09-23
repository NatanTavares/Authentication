import Head from "next/head";
import { setupAPIClient } from "../services/api";
import { withSSRAuthenticated } from "../utils/withSSRAuthenticated";

import styles from "../styles/Metrics.module.css";

export default function Metrics() {
  return (
    <>
      <Head>
        <title>Metrics</title>
      </Head>

      <main className={styles.container}>
        <h1>Metrics list</h1>
      </main>
    </>
  );
}

export const getServerSideProps = withSSRAuthenticated(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("me");

    return {
      props: {},
    };
  },
  {
    permissions: ["metrics.list"],
    roles: ["administrator"],
  }
);
