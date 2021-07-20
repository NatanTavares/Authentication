import Head from "next/head";
import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import { Button } from "../components/Button";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const credentials = { email, password };
    await signIn(credentials);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Auth</title>
      </Head>

      <form className={styles.container} onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="email">
          <p>Email:</p>

          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label htmlFor="password">
          <p>Password:</p>

          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <Button type="submit" label="Sign in" />
      </form>
    </div>
  );
}
