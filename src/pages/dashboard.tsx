import Head from "next/head";
import { useEffect } from "react";
import { useCan } from "../hooks/useCan";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/apiClient";
import { setupAPIClient } from "../services/api";
import { withSSRAuthenticated } from "../utils/withSSRAuthenticated";

import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const { user } = useAuth();
  const userCanSeeMetrics = useCan({
    roles: ["administrator", "editor"],
    permissions: ["metrics.list"],
  });

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

        <strong className={styles.alert}>{user?.email}</strong>

        {userCanSeeMetrics && (
          <div>
            <h1>Métricas</h1>
          </div>
        )}
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
