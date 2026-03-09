import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to Cart", {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
    });
  };

  return (
    <div className="w-full flex flex-col group bg-transparent pro-card border-none hover:shadow-none transition-all">
      {/* Product Visual */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-zinc-900 border border-white/5">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
        </Link>

        {/* Actions Overlay */}
        <div className="absolute top-4 right-4 z-10">
          <HeartIcon product={product} />
        </div>

        {/* Fast Action (Hidden by default, reveal on hover) */}
        <div className="absolute inset-x-0 bottom-6 px-6 translate-y-24 group-hover:translate-y-0 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 z-10">
          <button
            onClick={() => addToCartHandler(product, 1)}
            className="w-full bg-emerald-500 text-black font-black py-4 rounded-sm shadow-2xl tracking-[0.2em] font-inter uppercase text-[10px] hover:bg-emerald-400 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <AiOutlineShoppingCart size={16} />
            <span>Purchase Item</span>
          </button>
        </div>

        {/* Status Tag */}
        {product.countInStock === 0 && (
          <div className="absolute top-4 left-4">
            <span className="bg-red-500/20 text-red-500 px-3 py-1 rounded-sm border border-red-500/30 text-[8px] font-black uppercase tracking-widest">Unavailable</span>
          </div>
        )}
      </div>

      {/* Meta Content */}
      <div className="pt-6 space-y-4 px-1">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-baseline gap-4">
            <span className="text-gray-700 font-extrabold tracking-widest text-[9px] uppercase">Peak Item</span>
            <span className="text-xl font-bold text-white font-inter tracking-tighter">
              NRP {product.price}
            </span>
          </div>

          <Link to={`/product/${product._id}`} className="block group/title">
            <h2 className="text-lg font-bold text-white/90 line-clamp-2 group-hover/title:text-emerald-500 transition-colors uppercase leading-tight font-inter tracking-[0.02em]">
              {product.name}
            </h2>
          </Link>
        </div>

        <div className="flex items-center gap-3 pt-2 text-gray-600 text-[10px] font-bold tracking-[0.2em] uppercase border-t border-white/5">
          {product.countInStock > 0 ? (
            <span className="text-emerald-500/60 font-black">In Stock Now</span>
          ) : (
            <span className="text-red-500/60">Out of Stock</span>
          )}
          <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
          <span className="opacity-50">Curated Goods</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
