import Head from "next/head";
import { useEffect } from "react";
import { Can } from "../components/Can";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/apiClient";
import { Button } from "../components/Button";
import { setupAPIClient } from "../services/api";
import { withSSRAuthenticated } from "../utils/withSSRAuthenticated";

import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const { signOut } = useAuth();
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
          <h4 className={styles.alert}>You have access to the Metrics page</h4>
        </Can>

        <Button label="Sign-out" onClick={signOut} />
      </main>
    </div>
  );
}

export const getServerSideProps = withSSRAuthenticated(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("me");

  return {
    props: {},
  };
});
