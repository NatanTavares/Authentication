import Head from "next/head";
import { useEffect } from "react";
import { useCan } from "../hooks/useCan";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/apiClient";
import { setupAPIClient } from "../services/api";
import { withSSRAuthenticated } from "../utils/withSSRAuthenticated";

import styles from "../styles/Dashboard.module.css";
import { Can } from "../components/Can";

export default function Dashboard() {
  useEffect(() => {
    api
      .get("me")
      .then((response) => console.log(">[useEffect] me:", response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Auth</title>
      </Head>

      <main>
        <h1>You are logged in!</h1>

        <Can permissions={["metrics.list"]}>
          <h1 className={styles.alert}>Metrics</h1>
        </Can>
      </main>
    </div>
  );
}

export const getServerSideProps = withSSRAuthenticated(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("me");
  console.log(response);

  return {
    props: {},
  };
});
