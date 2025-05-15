import React, { useState } from 'react';
import '../styles/components/CurrencySelector.scss';
import { useCurrency } from '../contexts/CurrencyContext';

type Currency = {
    code: string;
    symbol: string;
    name: string;
};

const currencies: Currency[] = [
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'USD', symbol: '$', name: 'Dollar américain' },
    { code: 'GBP', symbol: '£', name: 'Livre sterling' }
];

const CurrencySelector: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currency, setCurrency } = useCurrency();

    const handleCurrencyChange = (newCurrency: Currency) => {
        setCurrency(newCurrency);
        setIsOpen(false);
    };

    return (
        <div className="currency-selector">
            <button
                className="currency-button"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Sélectionner une devise"
            >
                {currency.symbol} {currency.code}
            </button>

            {isOpen && (
                <div className="currency-dropdown">
                    {currencies.map((currencyOption) => (
                        <button
                            key={currencyOption.code}
                            className={`currency-option ${currency.code === currencyOption.code ? 'active' : ''}`}
                            onClick={() => handleCurrencyChange(currencyOption)}
                        >
                            <span className="currency-symbol">{currencyOption.symbol}</span>
                            <span className="currency-name">{currencyOption.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CurrencySelector; 