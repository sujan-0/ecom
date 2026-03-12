import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) return (
    <div className="flex flex-col lg:flex-row gap-8">
      <AdminMenu />
      <div className="flex-1 flex justify-center items-center py-40"><Loader size="lg" /></div>
    </div>
  );

  if (isError) return (
    <div className="flex flex-col lg:flex-row gap-8">
      <AdminMenu />
      <div className="flex-1 text-red-500 font-medium py-10">Failed to load products.</div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-fade-in">
      <AdminMenu />

      <div className="flex-1 space-y-6">
        <div>
          <p className="text-overline text-brand-500 mb-1">Inventory</p>
          <h1 className="font-display text-3xl text-slate-900">All Products</h1>
          <p className="text-slate-500 text-sm mt-1">{products?.length} products in catalog</p>
        </div>

        <div className="space-y-3">
          {products?.map((product) => (
            <Link
              key={product._id}
              to={`/admin/product/update/${product._id}`}
              className="flex items-center gap-5 p-4 bg-white rounded-2xl border border-slate-200 hover:border-brand-400 hover:shadow-md transition-all group"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded-xl object-cover border border-slate-100 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <h3 className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors truncate">{product.name}</h3>
                  <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">
                    {moment(product.createdAt).format("MMM D, YYYY")}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">{product.description?.substring(0, 100)}</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm font-bold text-slate-900">NRP {product.price?.toLocaleString()}</span>
                  {product.countInStock > 0
                    ? <span className="badge-brand">{product.countInStock} in stock</span>
                    : <span className="badge-danger">Out of stock</span>}
                </div>
              </div>
              <span className="text-slate-400 group-hover:text-brand-500 transition-colors flex-shrink-0">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
