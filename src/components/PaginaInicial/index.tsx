// PaginaInicial.js
import React from 'react';
import styles from './styles.module.css';

export default function PaginaInicial() {
  return (
    <>
    
      <span id='paginainicial' className={styles.featuresSection}>

        <div className={styles.container}>
          <h2 className={styles.titulo}>Por que Escolher a LUMMA?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Agilidade</h3>
              <p>Processos otimizados para entregar resultados mais rápidos</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔒</div>
              <h3>Segurança</h3>
              <p>Seus dados protegidos com as melhores práticas do mercado</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📈</div>
              <h3>Resultados</h3>
              <p>Acompanhe métricas e tome decisões baseadas em dados</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>💬</div>
              <h3>Suporte</h3>
              <p>Equipe especializada para ajudar no que precisar</p>
            </div>
          </div>
        </div>
      </span>
    </>
  );
};