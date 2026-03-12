import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import { setCategories, setProducts, setChecked } from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import { AiOutlineFilter } from "react-icons/ai";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector((state) => state.shop);

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredProductsQuery = useGetFilteredProductsQuery({ checked, radio });

  useEffect(() => {
    if (!categoriesQuery.isLoading && categoriesQuery.data) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch, categoriesQuery.isLoading]);

  useEffect(() => {
    if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
      const maxPrice = parseInt(priceFilter, 10) || 10000;
      const filtered = filteredProductsQuery.data.filter((p) => p.price <= maxPrice);
      dispatch(setProducts(filtered));
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter, filteredProductsQuery.isLoading]);

  const handleCheck = (value, id) => {
    const updated = value ? [...checked, id] : checked.filter((c) => c !== id);
    dispatch(setChecked(updated));
  };

  const resetFilters = () => {
    window.location.reload();
  };

  const FilterPanel = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white">Filters</h3>
        <button
          onClick={resetFilters}
          className="text-xs text-zinc-500 hover:text-white transition-colors"
        >
          Reset all
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <p className="text-label text-zinc-500">Category</p>
        <div className="space-y-3">
          {categories?.map((c) => (
            <label key={c._id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                onChange={(e) => handleCheck(e.target.checked, c._id)}
                className="rounded"
              />
              <span className="text-sm text-zinc-400 group-hover:text-white transition-colors select-none">
                {c.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-label text-zinc-500">Max Price</p>
          <span className="text-xs font-bold text-brand-400">NRP {priceFilter || "10,000"}</span>
        </div>
        <input
          type="range"
          min="0"
          max="10000"
          step="100"
          value={priceFilter || 10000}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="w-full"
        />
        <div className="flex justify-between text-[10px] text-zinc-600 font-medium">
          <span>0</span>
          <span>10,000</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      {/* Page header */}
      <div className="mb-10 space-y-2">
        <p className="text-overline text-brand-500">Catalog</p>
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <h1 className="font-display text-4xl md:text-5xl text-white">
            {checked.length > 0 ? "Filtered" : "All"} Products
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-500">
              <span className="font-semibold text-white">{products?.length || 0}</span> items
            </span>
            {/* Mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden btn-secondary py-2 px-4 gap-2"
            >
              <AiOutlineFilter size={16} />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="card p-6 sticky top-24 rounded-xl">
            <FilterPanel />
          </div>
        </aside>

        {/* Mobile sidebar */}
        {sidebarOpen && (
          <div className="lg:hidden card p-6 rounded-xl mb-4 animate-slide-down">
            <FilterPanel />
          </div>
        )}

        {/* Products grid */}
        <main className="lg:col-span-9">
          {filteredProductsQuery.isLoading ? (
            <div className="flex justify-center items-center py-40">
              <Loader size="lg" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 rounded-xl border border-white/5 bg-white/[0.01]">
              <p className="text-zinc-500 text-sm font-medium mb-2">No products match your filters</p>
              <button onClick={resetFilters} className="text-brand-400 text-sm font-semibold hover:text-brand-300 transition-colors">
                Clear filters →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
              {products?.map((p, i) => (
                <div
                  key={p._id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: "both" }}
                >
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
