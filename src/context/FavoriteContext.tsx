import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../data/products';
import { toast } from '../components/ui/use-toast';
import { favoriteService } from '@/services/favorite.service';
import { ResponseProduct } from '@/models/Product.model';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from './LanguageContext';
import { useAuth } from './AuthContext';

interface FavoriteContextType {
  favorite: ResponseProduct[];
  addToFavorite: (product: Product, quantity?: number) => void;
  removeFromFavorite: (productId: string) => void;
  // updateQuantity: (productId: string, quantity: number) => void;
  clearFavorite: () => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  const {data: favorite, refetch} = useQuery({
    queryKey: ['favorites'],
    queryFn: () => favoriteService.getAllFavorites(),
    enabled: isAuthenticated // Only fetch favorites if user is authenticated
  });

  const addToFavorite = (product: Product, quantity = 1) => {
    if (!isAuthenticated) {
      toast({
        title: t('favorite.authenticationRequired'),
        description: t('favorite.pleaseLogin'),
        variant: "destructive"
      });
      return;
    }

    favoriteService.addToFavorite(product._id)
      .then(() => {
      toast({
        title: t('favorite.itemAddedToFavorites'),
        description: t('favorite.itemAddedToFavoritesDesc'),
      });
      refetch();
      })
      .catch((error) => {
        toast({
          title: t('favorite.error'),
          description: error.message || t('favorite.addError'),
          variant: "destructive"
        });
    });
  };

  const removeFromFavorite = (productId: string) => {
    if (!isAuthenticated) {
      toast({
        title: t('favorite.authenticationRequired'),
        description: t('favorite.pleaseLogin'),
        variant: "destructive"
      });
      return;
    }

    favoriteService.removeFromFavorite(productId)
      .then(() => {
      toast({
        title: t('favorite.itemRemovedFromFavorites'),
        description: t('favorite.itemRemovedFromFavoritesDesc'),
      });
      refetch();
      })
      .catch((error) => {
        toast({
          title: t('favorite.error'),
          description: error.message || t('favorite.removeError'),
          variant: "destructive"
        });
    });
  };

  const clearFavorite = () => {
    if (!isAuthenticated) {
      toast({
        title: t('favorite.authenticationRequired'),
        description: t('favorite.pleaseLogin'),
        variant: "destructive"
      });
      return;
    }

    favoriteService.clearFavorite()
      .then(() => {
    toast({
        title: t('favorite.clearFavorite'),
        description: t('favorite.clearFavoriteDesc'),
      });
      refetch();
      })
      .catch((error) => {
        toast({
          title: t('favorite.error'),
          description: error.message || t('favorite.clearError'),
          variant: "destructive"
        });
    });
  };

  return (
    <FavoriteContext.Provider value={{
      favorite: favorite || [],
      addToFavorite,
      removeFromFavorite,
      // updateQuantity,
      clearFavorite,
    }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error('useFavorite must be used within a FavoriteProvider');
  }
  return context;
};
