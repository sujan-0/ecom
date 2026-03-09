import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading && categoriesQuery.data) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch, categoriesQuery.isLoading]);

  useEffect(() => {
    if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
      const maxPrice = parseInt(priceFilter, 10) || 10000;
      const filteredProducts = filteredProductsQuery.data.filter((product) => {
        return product.price <= maxPrice;
      });
      dispatch(setProducts(filteredProducts));
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter, filteredProductsQuery.isLoading]);

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  return (
    <div className="fade-in">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3 space-y-10 bg-zinc-900/40 p-8 rounded-sm border border-white/5 h-fit sticky top-32">
          <div className="space-y-6">
            <h3 className="text-xs font-black tracking-[0.3em] text-emerald-500 uppercase">Filter Catalog</h3>

            {/* Categories */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">By Category</span>
              <div className="grid grid-cols-1 gap-3">
                {categories?.map((c) => (
                  <label key={c._id} className="flex items-center gap-3 group cursor-pointer">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 rounded-sm border-white/10 bg-white/5 text-emerald-500 focus:ring-emerald-500 transition-all"
                    />
                    <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">{c.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Price Limit</span>
                <span className="text-xs font-black text-emerald-500">NRP {priceFilter || 10000}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceFilter || 10000}
                onChange={handlePriceChange}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[8px] font-bold text-gray-700 uppercase tracking-widest">
                <span>0</span>
                <span>10,000</span>
              </div>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 text-[10px] font-bold tracking-[0.2em] border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all uppercase"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Product Results */}
        <main className="lg:col-span-9 space-y-12">
          <div className="flex justify-between items-baseline border-b border-white/5 pb-6">
            <h2 className="text-4xl font-black tracking-tighter text-white uppercase">
              {checked.length > 0 ? "Filtered" : "Full"} <span className="text-emerald-500">Inventory</span>
            </h2>
            <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">
              {products?.length} Results Identified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.length === 0 ? (
              <div className="col-span-full py-40 flex flex-col items-center justify-center opacity-40">
                <Loader />
                <p className="mt-6 text-sm font-bold tracking-widest uppercase">Fetching Assets...</p>
              </div>
            ) : (
              products?.map((p) => (
                <div key={p._id} className="animate-fade-in">
                  <ProductCard p={p} />
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Shop;
