import Assinaturas from "@/components/Assinaturas";
import styles from "./page.module.css";
import Dashboard from "@/components/Dashboard";
import PrivateRoute from "@/components/PrivateRouter";

export default function Home() {
  return (
    <>
      <PrivateRoute>

        <div className={styles.dashboard}>
          <Dashboard
            quantityc={90}
            quantityp={890}
            quantityos={300}
            quantitys={50}
          />
        </div>

      </PrivateRoute>
    </>
  );
}
