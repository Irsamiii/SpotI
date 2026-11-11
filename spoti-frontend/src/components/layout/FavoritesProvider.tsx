"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type FavoritesContextValue = {
  favoriteIds: string[];
  isFavorite: (spotId: string) => boolean;
  toggleFavorite: (spotId: string) => void;
};

const FavoritesContext =
  createContext<FavoritesContextValue | null>(null);

const STORAGE_KEY = "studyspot-favorite-ids";

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const savedFavorites =
      window.localStorage.getItem(STORAGE_KEY);

    if (savedFavorites) {
      try {
        const parsedFavorites: unknown =
          JSON.parse(savedFavorites);

        if (
          Array.isArray(parsedFavorites) &&
          parsedFavorites.every(
            (item) => typeof item === "string",
          )
        ) {
          // This state update intentionally restores external
          // localStorage data after the component mounts.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setFavoriteIds(parsedFavorites);
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    // This state update indicates that localStorage hydration
    // has completed.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) {
      return;
    }

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(favoriteIds),
    );
  }, [favoriteIds, hasLoaded]);

  const isFavorite = useCallback(
    (spotId: string) => {
      return favoriteIds.includes(spotId);
    },
    [favoriteIds],
  );

  const toggleFavorite = useCallback((spotId: string) => {
    setFavoriteIds((currentIds) => {
      if (currentIds.includes(spotId)) {
        return currentIds.filter((id) => id !== spotId);
      }

      return [...currentIds, spotId];
    });
  }, []);

  const value = useMemo(
    () => ({
      favoriteIds,
      isFavorite,
      toggleFavorite,
    }),
    [favoriteIds, isFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider",
    );
  }

  return context;
}
