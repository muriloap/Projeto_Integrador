"use client";

import { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import styles from "./styles.module.css";

type Props = {
  allowed: string[];
  children: ReactNode;
};

export function RequiredGroup({ allowed, children }: Props) {
  const { user } = useAuth();

  const hasAccess =
    user && user.groups.some(group => allowed.includes(group));

  if (hasAccess) {
    return <>{children}</>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.overlay}>
        <h1>Faça upgrade para Premium</h1>
        <p>Para ter acesso a essa página</p>
      </div>

      <div className={styles.blockedContent}>
        {children}
      </div>
    </div>
  );
}
