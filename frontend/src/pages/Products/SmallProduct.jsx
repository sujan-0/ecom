import { Link } from "react-router-dom";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-full flex items-center gap-6 p-1.5 rounded-sm hover:bg-white/[0.03] transition-all group group/mini-card border border-white/5 relative overflow-hidden bg-zinc-950 shadow-none hover:border-white/10 h-24">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 opacity-0 group-hover/mini-card:opacity-100 transition-opacity blur-xl" />

      {/* Product Image */}
      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-sm m-0.5 border border-white/5">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover/mini-card:scale-110 transition-transform duration-700 opacity-80 group-hover/mini-card:opacity-100"
          />
        </Link>
      </div>

      {/* Meta Content */}
      <div className="flex-grow flex flex-col justify-center min-w-0 pr-4 gap-1">
        <Link to={`/product/${product._id}`}>
          <h2 className="text-xs font-bold text-white/90 truncate group-hover/mini-card:text-emerald-500 transition-colors uppercase tracking-[0.02em] font-inter">
            {product.name}
          </h2>
        </Link>
        <p className="text-[8px] text-gray-700 font-extrabold tracking-[0.3em] uppercase opacity-70 mb-1">{product.brand}</p>
        <div className="flex items-center gap-4">
          <span className="text-sm font-black text-white leading-none font-inter tracking-tighter">
            ${product.price}
          </span>
          <div className="w-1 h-1 bg-white/10 rounded-full" />
          <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest opacity-80">Collection Peak</span>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
