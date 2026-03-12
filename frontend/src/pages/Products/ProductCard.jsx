import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...p, qty: 1 }));
    toast.success("Added to cart", { position: "top-right", autoClose: 1500, theme: "dark" });
  };

  return (
    <div className="group flex flex-col w-full bg-zinc-950 border border-white/5 rounded-xl overflow-hidden hover:border-brand-500/25 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] transition-all duration-300 h-full">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 flex-shrink-0">
        <Link to={`/product/${p?._id}`}>
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
          />
        </Link>

        <div className="absolute top-3 right-3">
          <HeartIcon product={p} />
        </div>

        {p.countInStock === 0 && (
          <div className="absolute top-3 left-3">
            <span className="badge-danger">Out of Stock</span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            onClick={addToCartHandler}
            disabled={p.countInStock === 0}
            className="btn-primary w-full py-3 gap-2"
          >
            <AiOutlineShoppingCart size={15} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${p?._id}`} className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-white leading-snug line-clamp-2 hover:text-brand-400 transition-colors">
              {p?.name}
            </h2>
          </Link>
          <span className="text-sm font-bold text-white whitespace-nowrap">
            NRP {p?.price?.toLocaleString()}
          </span>
        </div>

        {p?.description && (
          <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
            {p.description}
          </p>
        )}

        <div className="flex items-center gap-2 mt-auto pt-2">
          {p.countInStock > 0 ? (
            <span className="badge-brand">In Stock</span>
          ) : (
            <span className="badge-danger">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
