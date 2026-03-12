import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";
import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    dispatch(setFavorites(getFavoritesFromLocalStorage()));
  }, []);

  const toggleFavorites = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <button
      onClick={toggleFavorites}
      className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all ${isFavorite
          ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
          : "bg-white/80 border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50"
        }`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? <FaHeart size={13} /> : <FaRegHeart size={13} />}
    </button>
  );
};

export default HeartIcon;
