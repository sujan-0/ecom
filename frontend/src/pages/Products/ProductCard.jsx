import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Added to Collection", {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
    });
  };

  return (
    <div className="w-full h-full flex flex-col group animate-fade-in border border-white/5 bg-zinc-950 p-2 rounded-sm hover:border-emerald-500/20 hover:bg-white/[0.02] transition-all">
      {/* Product Image Area */}
      <section className="relative aspect-[3/4] overflow-hidden rounded-sm bg-zinc-900 border border-white/5">
        <Link to={`/product/${p?._id}`}>
          <img
            className="cursor-pointer w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
            src={p.image}
            alt={p.name}
          />
        </Link>
        <div className="absolute top-4 right-4 z-10">
          <HeartIcon product={p} />
        </div>

        {/* Purchase Hover Action */}
        <div className="absolute inset-x-0 bottom-6 px-6 translate-y-24 group-hover:translate-y-0 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 z-10">
          <button
            onClick={() => addToCartHandler(p, 1)}
            className="w-full bg-emerald-500 text-black font-black py-4 rounded-sm shadow-2xl tracking-[0.2em] font-inter uppercase text-[10px] hover:bg-emerald-400 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <AiOutlineShoppingCart size={16} />
            <span>Purchase</span>
          </button>
        </div>

        {/* Verification Tag */}
        <div className="absolute bottom-4 left-4 pointer-events-none">
          <span className="bg-black/80 backdrop-blur-md text-gray-500 text-[8px] font-black tracking-widest px-3 py-1 rounded-sm border border-white/10 uppercase">
            Verified Asset
          </span>
        </div>
      </section>

      {/* Info Content */}
      <div className="pt-6 pb-4 px-3 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-baseline gap-4">
            <span className="text-gray-700 font-extrabold tracking-widest text-[9px] uppercase">Peak Item</span>
            <span className="text-lg font-black text-white font-inter tracking-tighter">
              NRP {p?.price}
            </span>
          </div>

          <Link to={`/product/${p?._id}`} className="block group/title">
            <h2 className="text-sm font-bold text-white/90 line-clamp-1 group-hover/title:text-emerald-500 transition-colors uppercase leading-tight font-inter tracking-tight">
              {p?.name}
            </h2>
          </Link>
        </div>

        <div className="flex items-center gap-3 pt-3 text-gray-700 text-[9px] font-extrabold tracking-[0.2em] uppercase border-t border-white/5">
          <span className="opacity-70 truncate">{p?.description?.substring(0, 40)}...</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
