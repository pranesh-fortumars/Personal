import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface WishlistContextType {
  wishlistIds: number[];
  isWishlisted: (id: number) => boolean;
  toggleWishlist: (id: number) => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);
const STORAGE_KEY = 'aurelia-wishlist';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  const toggleWishlist = useCallback((id: number) => {
    setWishlistIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const isWishlisted = useCallback((id: number) => wishlistIds.includes(id), [wishlistIds]);

  return (
    <WishlistContext.Provider value={{ wishlistIds, isWishlisted, toggleWishlist, wishlistCount: wishlistIds.length }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
