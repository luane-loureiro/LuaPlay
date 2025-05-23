// src/components/Menu/Menu.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Menu.module.css';

export default function Menu() {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.menu}>
      <div className={styles.logo}>
        <h2><Link to="/" className={styles.navLink}>AluraFlix</Link></h2>
      </div>
      <ul className={styles.navLinks}>
        <li><Link to="/" className={styles.navLink}>Home</Link></li>
        <li><Link to="/novidades" className={styles.navLink}>Novidades</Link></li>
        <li><Link to="/minha-lista" className={styles.navLink}>Minha Lista</Link></li>
        {!user && (
          <>
            <li><Link to="/login" className={styles.navLink}>Login</Link></li>
            <li><Link to="/signup" className={styles.navLink}>Cadastro</Link></li>
          </>
        )}
        {user && (
          <li className={styles.navLink}>
            Olá, {user.name}!
            <button onClick={logout} style={{ marginLeft: '10px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
