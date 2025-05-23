import React from 'react';
import styles from './Banner.module.css';

export default function Banner() {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h1 className={styles.title}>Título do Filme/Serie</h1>
        <p className={styles.description}>
          Essa é a descrição do filme ou série que está em destaque no banner.
          Pode ser uma frase impactante ou resumo rápido.
        </p>
        <button className={styles.button}>Assistir</button>
      </div>
    </section>
  );
}