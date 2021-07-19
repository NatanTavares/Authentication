import Head from "next/head";
import { useAuth } from "../hooks/useAuth";

import styles from "../styles/Dashboard.module.css";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();

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
      </main>
    </div>
  );
}
