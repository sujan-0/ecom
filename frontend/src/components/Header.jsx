import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24 min-h-[500px] border border-white/5 rounded-sm animate-pulse relative overflow-hidden bg-black/20">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-24 text-emerald-500 font-black border border-emerald-500/20 rounded-sm animate-fade-in uppercase tracking-widest text-sm bg-emerald-500/5">
        Sync Failure: Unable to retrieve collection peaks.
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:min-h-[550px] animate-fade-in relative">
      {/* High-Performance Carousel Section */}
      <div className="lg:col-span-8 overflow-hidden rounded-sm border border-white/5 bg-zinc-950 p-2 group transition-all relative">
        <ProductCarousel />

        {/* Hero Floating Meta */}
        <div className="absolute top-10 left-10 z-20 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md px-5 py-2.5 rounded-sm flex items-center gap-2 border border-white/10">
            <span className="text-[10px] font-black tracking-[0.3em] text-white uppercase">MERO STORE COLLECTION</span>
          </div>
        </div>
      </div>

      {/* Featured & Mini-Grid Section */}
      <div className="lg:col-span-4 flex flex-col gap-10 h-full">
        <div className="p-10 border border-white/5 rounded-sm bg-black/20 flex flex-col gap-8 h-full relative overflow-hidden group">
          {/* Section BG Decor */}
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-500/5 blur-[80px] rounded-full -z-10" />

          <div className="flex justify-between items-center px-2">
            <h3 className="text-2xl font-black text-white tracking-tighter uppercase font-inter leading-none">TOP <span className="text-emerald-500">PICKS</span></h3>
            <span className="text-[10px] font-black text-gray-700 tracking-[0.2em] uppercase">VERIFIED</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 flex-grow">
            {data?.slice(0, 3).map((product) => (
              <div key={product._id} className="transition-all hover:scale-105 active:scale-95 group/small-item">
                <SmallProduct product={product} />
              </div>
            ))}
          </div>

          <div className="mt-6 pt-10 border-t border-white/5 flex flex-col items-center text-center gap-6">
            <div className="space-y-2">
              <h4 className="text-lg font-black text-white uppercase tracking-tight">GLOBAL AVAILABILITY</h4>
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">Shipping Worldwide Coverage</p>
            </div>

            <button className="w-full bg-emerald-500 text-black font-black py-5 px-10 rounded-sm text-[10px] hover:bg-emerald-400 transition-all uppercase tracking-widest active:scale-95">Enroll Membership</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
