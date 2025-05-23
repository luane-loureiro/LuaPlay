import React from 'react';
import styles from './Categories.module.css';

const Categories = ({ categories, onSelectCategory }) => {
  return (
    <div className={styles.categoriesContainer}>
      {categories.map(category => (
        <button
          key={category.id}
          className={styles.categoryButton}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default Categories;