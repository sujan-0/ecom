import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review submitted!", { theme: "light" });
    } catch (err) {
      toast.error(err?.data || err.message, { theme: "light" });
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="mb-8">
        <Link to="/" className="text-slate-400 hover:text-slate-700 text-sm transition-colors flex items-center gap-1.5 group">
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          Back to Home
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-40"><Loader size="lg" /></div>
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.message}</Message>
      ) : (
        <div className="space-y-16">
          {/* Product layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="relative group">
              <div className="aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute top-5 right-5">
                <HeartIcon product={product} />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="badge-brand">In Stock: {product.countInStock}</span>
                  <span className="text-slate-400 text-xs">•</span>
                  <span className="text-xs text-slate-400 font-medium">Added {moment(product.createdAt).fromNow()}</span>
                </div>
                <h1 className="font-display text-4xl lg:text-5xl text-slate-900 leading-tight">{product.name}</h1>
                <p className="text-slate-500 text-base leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-black text-slate-900">NRP {product.price?.toLocaleString()}</span>
                  <span className="text-slate-400 text-sm line-through">NRP {Math.round(product.price * 1.2).toLocaleString()}</span>
                </div>
                <Ratings value={product.rating} text={`${product.numReviews} reviews`} />
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-100">
                {[
                  { icon: <FaBox size={13} className="text-brand-500" />, label: `Stock: ${product.countInStock}` },
                  { icon: <FaClock size={13} className="text-brand-500" />, label: `Listed ${moment(product.createdAt).fromNow()}` },
                  { icon: <FaStore size={13} className="text-brand-500" />, label: "Condition: New" },
                  { icon: <FaStar size={13} className="text-brand-500" />, label: `${product.numReviews} Reviews` },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                    {icon}<span>{label}</span>
                  </div>
                ))}
              </div>

              {/* Add to cart */}
              <div className="flex gap-3 items-stretch h-14">
                {product.countInStock > 0 && (
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="form-input w-24 text-center font-semibold"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                )}
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="btn-primary flex-1 gap-3"
                >
                  <FaShoppingCart size={16} />
                  {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-slate-100 pt-12">
            <ProductTabs
              loadingProductReview={loadingProductReview}
              userInfo={userInfo}
              submitHandler={submitHandler}
              rating={rating}
              setRating={setRating}
              comment={comment}
              setComment={setComment}
              product={product}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
