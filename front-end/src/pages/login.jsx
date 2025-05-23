import { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import styles from './Login.module.css';
import { loginUser } from '../services/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await loginUser(form);
    login({ name: response.name, token: response.token }); 
    toast.success("Login realizado com sucesso!");
    navigate("/");
  } catch (err) {
    toast.error("Falha no login: " + err.message);
  }
};

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>AluraFlix</h1>
        <p className={styles.subtitle}>Bem-vindo! Faça seu login.</p>

        <label htmlFor="email" className={styles.label}>E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          className={styles.input}
          placeholder="seu@exemplo.com"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          id="password"
          name="password"
          type="password"
          className={styles.input}
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className={styles.button}>Entrar</button>

        <p className={styles.footerText}>
          Ainda não tem cadastro?{' '}
          <Link to="/signup" className={styles.link}>
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}
