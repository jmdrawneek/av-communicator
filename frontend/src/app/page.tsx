import styles from "./page.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to AV Communicator</h1>

        <div className={styles.optionsContainer}>
          <Link href="/rooms" className={styles.optionCard}>
            <h2>View Rooms</h2>
            <p>Manage your rooms and associated dashboards</p>
          </Link>

          <Link href="/automations" className={styles.optionCard}>
            <h2>View Automations</h2>
            <p>Create and manage your automations</p>
          </Link>

          <Link href="/devices" className={styles.optionCard}>
            <h2>View Devices</h2>
            <p>Manage your connected devices</p>
          </Link>
        </div>
      </main>
      <footer className={styles.footer}>

      </footer>
    </div>
  );
}
