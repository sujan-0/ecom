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
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
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

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review Submitted", { theme: "dark" });
    } catch (error) {
      toast.error(error?.data || error.message, { theme: "dark" });
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="fade-in max-w-7xl mx-auto">
      <div className="mb-12">
        <Link
          to="/"
          className="text-gray-500 hover:text-white font-bold text-[10px] tracking-[0.3em] uppercase transition-all flex items-center gap-2 group"
        >
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
          Return to Hub
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-40">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <div className="space-y-20">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Image Section */}
            <div className="lg:w-1/2 relative group">
              <div className="aspect-square overflow-hidden rounded-sm border border-white/5 bg-zinc-950">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                />
              </div>
              <div className="absolute top-6 right-6 z-10 scale-125">
                <HeartIcon product={product} />
              </div>
            </div>

            {/* Info Section */}
            <div className="lg:w-1/2 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-emerald-500 font-black tracking-[0.3em] text-[10px] uppercase">Official Merchandise</span>
                  <div className="w-1 h-1 bg-white/10 rounded-full" />
                  <span className="text-gray-600 font-bold tracking-[0.2em] text-[10px] uppercase">Verified Asset</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-black tracking-tighter text-white font-inter uppercase">{product.name}</h1>
                <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-xl">
                  {product.description}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-black text-white font-inter tracking-tighter">NRP {product.price}</span>
                  <span className="text-gray-700 text-xs font-bold uppercase tracking-widest line-through mb-1">Was NRP {Math.round(product.price * 1.2)}</span>
                </div>

                <div className="flex items-center gap-6 pb-2">
                  <Ratings value={product.rating} text={`${product.numReviews} Verified Reviews`} />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-10 py-8 border-y border-white/5">
                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <FaBox className="text-emerald-500/40" size={14} />
                  <span>Inventory: {product.countInStock}</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <FaClock className="text-emerald-500/40" size={14} />
                  <span>Dropped: {moment(product.createdAt).fromNow()}</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <FaStore className="text-emerald-500/40" size={14} />
                  <span>Condition: New</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <FaShoppingCart className="text-emerald-500/40" size={14} />
                  <span>Total Orders: {product.quantity}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-center h-16">
                {product.countInStock > 0 && (
                  <div className="h-full">
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="h-full px-6 bg-white/5 border border-white/10 rounded-sm text-white font-black text-[10px] tracking-widest focus:border-emerald-500 transition-colors uppercase outline-none min-w-[100px]"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1} className="bg-zinc-900">
                          Qty: {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="flex-grow h-full bg-emerald-500 text-black font-black px-10 rounded-sm hover:bg-emerald-400 disabled:bg-gray-800 disabled:text-gray-500 transition-all text-[10px] tracking-[0.3em] uppercase active:scale-95"
                >
                  {product.countInStock > 0 ? "Commit to Cart" : "Out of Inventory"}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-20 border-t border-white/5">
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
