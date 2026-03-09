import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

  return (
    <div className="flex flex-col gap-32 animate-fade-in pb-40">
      {!keyword ? <Header /> : null}

      {isLoading ? (
        <div className="flex justify-center items-center py-40 min-h-[500px]">
          <Loader />
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center py-20 max-w-lg mx-auto">
          <Message variant="danger">
            {error?.data?.message || error?.error || "Connection error. Please try again later."}
          </Message>
        </div>
      ) : (
        <section className="space-y-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="space-y-6 max-w-3xl">
              <span className="text-subtle text-emerald-500 block">Peak Performance Collection</span>
              <h1 className="heading-display text-7xl md:text-8xl leading-none font-inter text-white uppercase">
                SEASON <span className="text-emerald-500">ARRIVALS</span>
              </h1>
              <p className="text-gray-600 text-xl font-medium tracking-tight leading-relaxed">
                Precision-engineered apparel and accessories. Designed for high impact and modern durability.
              </p>
            </div>

            <Link
              to="/shop"
              className="group whitespace-nowrap bg-white text-black font-black py-6 px-16 rounded-sm hover:bg-emerald-500 transition-all active:scale-95 text-[10px] tracking-[0.4em] uppercase flex items-center gap-4"
            >
              <span>Explore All</span>
              <span className="transform group-hover:translate-x-3 transition-transform text-xl">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24">
            {data?.products?.map((product) => (
              <div key={product._id} className="flex justify-center">
                <Product product={product} />
              </div>
            ))}
          </div>

          {data?.products?.length === 0 && (
            <div className="text-center py-60 border border-white/5 bg-black/40 rounded-sm">
              <p className="text-gray-700 text-[10px] font-black tracking-[0.4em] uppercase">No matching inventory identified</p>
              <Link to="/shop" className="text-emerald-500 mt-8 inline-block hover:underline font-bold text-[10px] tracking-[0.3em] uppercase">Return to Full Catalog</Link>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Home;
