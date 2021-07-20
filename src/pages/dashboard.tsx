import { useRouter } from "next/dist/client/router";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import Head from "next/head";

import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const Not = isAuthenticated ? null : (
    <strong className={styles.alert}>not</strong>
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Auth</title>
      </Head>

      <main>
        <h1>You are {Not} logged in!</h1>
        {!isAuthenticated && (
          <Button
            type="button"
            label={"Login"}
            onClick={(event) => router.push("/")}
          />
        )}
      </main>
    </div>
  );
}