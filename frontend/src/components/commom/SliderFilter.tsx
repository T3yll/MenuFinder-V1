import React, { useEffect, useRef, useState } from 'react'
import { Category } from '../../types/Categories';
import "../../styles/components/commom/sliderFilter.scss"

function SliderFilter(categories: Array<Category>, setFilterSelectedCategory: (category: string) => void) {
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    // Référence pour le slider de catégories
    const categorySliderRef = useRef<HTMLDivElement>(null);

    // Fonction pour faire défiler le slider
    const scrollSlider = (direction: 'left' | 'right') => {
        if (categorySliderRef.current) {
            const scrollAmount = 300;
            const newScrollLeft = direction === 'right'
                ? categorySliderRef.current.scrollLeft + scrollAmount
                : categorySliderRef.current.scrollLeft - scrollAmount;

            categorySliderRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        setFilterSelectedCategory(selectedCategory);
    }, [selectedCategory]);




    return (
        <div className="category-slider-container">
            <div className="category-slider-wrapper">
                <div className="category-slider" ref={categorySliderRef}>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            <span className="category-emoji">{category.emoji}</span>
                            {category.name}
                        </button>
                    ))}
                </div>
                <button
                    className="slider-arrow slider-arrow-left"
                    onClick={() => scrollSlider('left')}
                    aria-label="Voir moins de catégories"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <button
                    className="slider-arrow slider-arrow-right"
                    onClick={() => scrollSlider('right')}
                    aria-label="Voir plus de catégories"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default SliderFilter;