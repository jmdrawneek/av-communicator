import styles from "./page.module.scss";
import FlowBuilderInterface from "@/components/flowbuilder";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to AV Communicator</h1>
        
          <FlowBuilderInterface />
      </main>
      <footer className={styles.footer}>
      
      </footer>
    </div>
  );
}
