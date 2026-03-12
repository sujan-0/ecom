import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <p className="text-overline text-brand-500 mb-2">Account</p>
        <h1 className="font-display text-3xl text-slate-900">Wishlist</h1>
        <p className="text-slate-500 text-sm mt-1">{favorites.length} saved {favorites.length === 1 ? "item" : "items"}</p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-5">
            <FaHeart className="text-red-400" size={28} />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
          <p className="text-slate-400 text-sm mb-6">Save products you love for later</p>
          <Link to="/shop" className="btn-primary">Explore Products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product, i) => (
            <div key={product._id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms`, animationFillMode: "both" }}>
              <Product product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
