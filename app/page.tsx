import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/home.module.scss"

export default function Home() {
  return (
    <div className={styles.home}>
      Go To <Link href="/dashboard">Dashboard</Link>
    </div>
  );
}
