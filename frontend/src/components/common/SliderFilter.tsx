import React from 'react';

// Interface pour les catégories
interface Category {
  id: string;
  name: string;
  emoji: string;
}

// Interface pour les props du composant
interface SliderFilterProps {
  categories: Category[];
  setSelectedCategory: (categoryId: string) => void;
}

const SliderFilter: React.FC<SliderFilterProps> = ({ categories, setSelectedCategory }) => {
  return (
    <nav className="categories-nav">
      <div className="categories-container">
        <div className="categories-scroll no-scrollbar">
          <div className="categories-list">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="category-btn"
              >
                <span className="category-emoji">{category.emoji}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SliderFilter;