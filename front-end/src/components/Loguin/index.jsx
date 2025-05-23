import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você vai chamar a API de autenticação depois
    console.log('Login:', { email, password });
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Entrar</h1>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className={styles.loginButton}>Entrar</button>
      </form>
    </div>
  );
};

export default Login;