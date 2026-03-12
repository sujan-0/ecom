import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, qty: 1 }));
    toast.success("Added to cart", { position: "top-right", autoClose: 1500, theme: "dark" });
  };

  return (
    <div className="group flex flex-col w-full bg-zinc-950 border border-white/5 rounded-xl overflow-hidden hover:border-brand-500/25 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
        </Link>

        {/* Heart */}
        <div className="absolute top-3 right-3">
          <HeartIcon product={product} />
        </div>

        {/* Out of stock badge */}
        {product.countInStock === 0 && (
          <div className="absolute top-3 left-3">
            <span className="badge-danger">Out of Stock</span>
          </div>
        )}

        {/* Add to cart slide-up */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            onClick={addToCartHandler}
            disabled={product.countInStock === 0}
            className="btn-primary w-full py-3 gap-2"
          >
            <AiOutlineShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Meta */}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <Link to={`/product/${product._id}`} className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-white leading-snug line-clamp-2 hover:text-brand-400 transition-colors">
              {product.name}
            </h2>
          </Link>
          <span className="text-base font-bold text-white whitespace-nowrap">
            NRP {product.price?.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          {product.countInStock > 0 ? (
            <span className="badge-brand">In Stock</span>
          ) : (
            <span className="badge-danger">Unavailable</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
