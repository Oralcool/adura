import React, { createContext, useState, useEffect, useContext } from 'react';
import { firestore } from '../firebaseConfig';
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove, setDoc, getDoc } from 'firebase/firestore';
import { useAuth } from './AuthProvider';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    if (user) {
      setLoading(true);
      const userDocRef = doc(firestore, 'users', user.uid);
      
      unsubscribe = onSnapshot(userDocRef, (docSnap) => {
        if (docSnap.exists()) {
          // The 'favorites' field might not exist yet, default to empty array
          setFavorites(docSnap.data().favorites || []);
        } else {
          // If the user document doesn't exist, create it.
          setDoc(userDocRef, { favorites: [] });
          setFavorites([]);
        }
        setLoading(false);
      }, (error) => {
        console.error("Error listening to favorites:", error);
        setLoading(false);
      });

    } else {
      // If there is no user, clear favorites and stop loading.
      setFavorites([]);
      setLoading(false);
    }

    // Cleanup subscription on unmount or user change
    return () => unsubscribe();
  }, [user]);

  const addFavorite = async (track) => {
    if (!user) return;
    const userDocRef = doc(firestore, 'users', user.uid);
    try {
      await updateDoc(userDocRef, {
        favorites: arrayUnion(track)
      });
    } catch (error) {
      // If the document or favorites array doesn't exist, `updateDoc` can fail.
      // Let's ensure the document exists with a `setDoc` merge.
      if (error.code === 'not-found') {
        await setDoc(userDocRef, { favorites: [track] }, { merge: true });
      } else {
        console.error("Error adding favorite: ", error);
      }
    }
  };

  const removeFavorite = async (trackId) => {
    if (!user) return;
    const userDocRef = doc(firestore, 'users', user.uid);
    // To remove an item from an array, we need the full object.
    // We find the specific track object in our current state using its ID.
    const trackToRemove = favorites.find(fav => fav.id === trackId);
    if (trackToRemove) {
      try {
        await updateDoc(userDocRef, {
          favorites: arrayRemove(trackToRemove)
        });
      } catch (error) {
        console.error("Error removing favorite: ", error);
      }
    }
  };

  const isFavorite = (trackId) => {
    return favorites.some(fav => fav.id === trackId);
  };

  const value = {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
