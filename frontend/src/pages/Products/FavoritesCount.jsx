import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <>
      {favoriteCount > 0 && (
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 text-[10px] font-bold text-black rounded-full flex items-center justify-center">
          {favoriteCount}
        </span>
      )}
    </>
  );
};

export default FavoritesCount;
