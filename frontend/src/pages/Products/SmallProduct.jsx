import { Link } from "react-router-dom";

const SmallProduct = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-zinc-950 hover:border-brand-500/25 hover:bg-white/[0.02] transition-all group"
    >
      {/* Thumbnail */}
      <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-900 border border-white/5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-85 group-hover:opacity-100"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1">
        <h3 className="text-sm font-semibold text-white truncate group-hover:text-brand-400 transition-colors leading-tight">
          {product.name}
        </h3>
        {product.brand && (
          <p className="text-[10px] text-zinc-600 font-medium uppercase tracking-wider truncate">
            {product.brand}
          </p>
        )}
        <p className="text-sm font-bold text-white">
          NRP {product.price?.toLocaleString()}
        </p>
      </div>

      {/* Arrow indicator */}
      <span className="text-zinc-700 group-hover:text-brand-500 group-hover:translate-x-1 transition-all text-lg flex-shrink-0">
        →
      </span>
    </Link>
  );
};

export default SmallProduct;
