import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[480px] rounded-2xl border border-white/5 bg-white/[0.01]">
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px] rounded-2xl border border-red-500/20 bg-red-500/5 text-red-400 text-sm font-medium">
        Failed to load featured products.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[520px]">
      {/* Carousel — takes 8 cols */}
      <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-white/5 bg-zinc-950">
        <ProductCarousel />

        {/* Floating label */}
        <div className="absolute top-5 left-5 z-20 pointer-events-none">
          <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">Featured Collection</span>
          </div>
        </div>
      </div>

      {/* Top picks panel — 4 cols */}
      <div className="lg:col-span-4 flex flex-col gap-5">
        {/* Heading */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Top Picks</h3>
          <Link to="/shop" className="text-xs text-brand-400 hover:text-brand-300 font-semibold transition-colors">
            View all →
          </Link>
        </div>

        {/* Small products list */}
        <div className="space-y-3 flex-1">
          {data?.slice(0, 4).map((product) => (
            <SmallProduct key={product._id} product={product} />
          ))}
        </div>

        {/* CTA card */}
        <div className="mt-auto p-6 rounded-xl border border-brand-500/20 bg-brand-500/5 space-y-4">
          <p className="text-sm font-semibold text-white">New member benefits</p>
          <p className="text-xs text-zinc-500 leading-relaxed">Get 10% off your first order when you create a free account today.</p>
          <Link to="/register" className="btn-primary w-full py-3 text-xs">
            Join Free
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
