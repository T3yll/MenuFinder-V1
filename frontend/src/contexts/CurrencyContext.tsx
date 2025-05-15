import React, { createContext, useState, useContext, ReactNode } from 'react';

type Currency = {
    code: string;
    symbol: string;
    name: string;
};

const defaultCurrency: Currency = {
    code: 'EUR',
    symbol: '€',
    name: 'Euro'
};

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    formatPrice: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
    currency: defaultCurrency,
    setCurrency: () => { },
    formatPrice: () => '',
});

interface CurrencyProviderProps {
    children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
    const [currency, setCurrency] = useState<Currency>(defaultCurrency);

    const formatPrice = (amount: number): string => {
        // Convertir selon les taux de change (simplifié ici)
        let convertedAmount = amount;
        if (currency.code === 'USD') {
            convertedAmount = amount * 1.1; // Taux approximatif EUR -> USD
        } else if (currency.code === 'GBP') {
            convertedAmount = amount * 0.85; // Taux approximatif EUR -> GBP
        }

        return `${currency.symbol}${convertedAmount.toFixed(2)}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => useContext(CurrencyContext);

export default CurrencyContext; 