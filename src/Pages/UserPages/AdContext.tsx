import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Ad {
  id: number;
  title: string;

}

interface AdContextType {
  ads: Ad[];
  addAd: (ad: Ad) => void;
}

const AdContext = createContext<AdContextType | undefined>(undefined);

export const useAds = () => {
  const context = useContext(AdContext);
  if (context === undefined) {
    throw new Error('useAds must be used within an AdProvider');
  }
  return context;
};

const AdContextPage: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ads, setAds] = useState<Ad[]>([]);

  const addAd = (ad: Ad) => {
    setAds(prevAds => [...prevAds, ad]);
  };

  return (
    <AdContext.Provider value={{ ads, addAd }}>
      {children}
    </AdContext.Provider>
  );
};

export default AdContextPage;