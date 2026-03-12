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
    <div className="flex flex-col gap-24 animate-fade-in pb-16">
      {/* Hero / Featured Section */}
      {!keyword && <Header />}

      {isLoading ? (
        <div className="flex justify-center items-center py-40">
          <Loader />
        </div>
      ) : isError ? (
        <div className="max-w-lg mx-auto py-20">
          <Message variant="danger">
            {error?.data?.message || error?.error || "Connection error. Please try again."}
          </Message>
        </div>
      ) : (
        <section className="space-y-12">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div className="space-y-2">
              <p className="text-overline text-brand-500">
                {keyword ? `Results for "${keyword}"` : "Featured Collection"}
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-white leading-none">
                {keyword ? "Search Results" : "New Arrivals"}
              </h2>
            </div>

            {!keyword && (
              <Link
                to="/shop"
                className="btn-secondary flex items-center gap-3 group"
              >
                <span>View All Products</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            )}
          </div>

          {/* Product grid */}
          {data?.products?.length === 0 ? (
            <div className="text-center py-24 rounded-xl border border-white/5 bg-white/[0.01]">
              <p className="text-zinc-500 text-sm font-medium mb-4">No products found</p>
              <Link to="/shop" className="text-brand-400 hover:text-brand-300 text-sm font-semibold transition-colors">
                Browse all products →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {data?.products?.map((product, i) => (
                <div
                  key={product._id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
                >
                  <Product product={product} />
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Features strip */}
      {!keyword && !isLoading && !isError && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 -mb-8">
          {[
            { icon: "🚚", title: "Free Shipping", desc: "On orders over NRP 5,000" },
            { icon: "🔒", title: "Secure Payment", desc: "256-bit SSL encryption" },
            { icon: "↩️", title: "Easy Returns", desc: "30-day hassle-free returns" },
            { icon: "💬", title: "24/7 Support", desc: "Round-the-clock assistance" },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.01] hover:border-brand-500/20 transition-all">
              <span className="text-2xl flex-shrink-0">{icon}</span>
              <div>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default Home;
