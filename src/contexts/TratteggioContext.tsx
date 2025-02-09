'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ITratteggi, tratteggi } from '@/models/tratteggi';

// Estado inicial
const initialTratteggio: ITratteggi = tratteggi[0];

// Contexto
interface TratteggioContextType {
  currentTratteggio: ITratteggi;
  swipeTratteggio: () => void;
}

// Creamos el contexto con un valor inicial vacío
const TratteggioContext = createContext<TratteggioContextType | undefined>(undefined);

// Componente proveedor del contexto
interface TratteggioProviderProps {
  children: ReactNode;
}

export const TratteggioProvider: React.FC<TratteggioProviderProps> = ({ children }) => {
  const [currentTratteggio, setCurrentTratteggio] = useState<ITratteggi>(initialTratteggio);

  const swipeTratteggio = () => {
    const currentIndex = tratteggi.findIndex((item) => item.id === currentTratteggio.id);

    if (currentIndex !== -1) {
      const nextIndex = currentIndex === tratteggi.length - 1 ? 0 : currentIndex + 1;
      setCurrentTratteggio(tratteggi[nextIndex]);
    } else {
      console.error("Not 'Tratteggio' found.");
    }
  };

  return (
    <TratteggioContext.Provider value={{ currentTratteggio, swipeTratteggio }}>
      {children}
    </TratteggioContext.Provider>
  );
};

// Hook para consumir el contexto
export const useTratteggio = (): TratteggioContextType => {
  const context = useContext(TratteggioContext);

  if (!context) {
    throw new Error('useTratteggio must be used within a TratteggioProvider');
  }

  return context;
};

