import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Menu from '../components/Menu';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import Playlist from '../components/Playlists';

const Home = () => {
  const [categories, setCategories] = useState([]);

  // Exemplo de carregar categorias (pode ser via API)
  useEffect(() => {
    // Simulando uma lista de categorias
    setCategories([
      { id: 1, name: 'Ação' },
      { id: 2, name: 'Comédia' },
      { id: 3, name: 'Drama' },
    ]);
  }, []);

  const handleSelectCategory = (categoryId) => {
    console.log('Categoria selecionada:', categoryId);
    // Aqui você pode filtrar a playlist ou fazer outra ação
  };

  return (
    <div className={styles.container}>
      <Menu />
      <Banner />
      <Categories categories={categories} onSelectCategory={handleSelectCategory} />
      <Playlist />
    </div>
  );
};

export default Home;