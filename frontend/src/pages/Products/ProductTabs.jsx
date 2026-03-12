import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const TABS = [
  { id: 1, label: "Write a Review" },
  { id: 2, label: "Customer Reviews" },
  { id: 3, label: "Related Products" },
];

const ProductTabs = ({
  loadingProductReview, userInfo, submitHandler,
  rating, setRating, comment, setComment, product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="space-y-8">
      {/* Tab list */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
              }`}
          >
            {tab.label}
            {tab.id === 2 && product.reviews.length > 0 && (
              <span className="ml-2 text-xs bg-brand-100 text-brand-700 rounded-full px-1.5 py-0.5">
                {product.reviews.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab panes */}
      {activeTab === 1 && (
        <div className="max-w-xl">
          {userInfo ? (
            <form onSubmit={submitHandler} className="space-y-5">
              <div>
                <label className="form-label" htmlFor="rating">Your Rating</label>
                <select
                  id="rating"
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="form-input"
                >
                  <option value="">Select rating…</option>
                  <option value="1">⭐ Poor</option>
                  <option value="2">⭐⭐ Fair</option>
                  <option value="3">⭐⭐⭐ Good</option>
                  <option value="4">⭐⭐⭐⭐ Very Good</option>
                  <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                </select>
              </div>
              <div>
                <label className="form-label" htmlFor="comment">Your Review</label>
                <textarea
                  id="comment"
                  rows="4"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this product…"
                  className="form-input resize-none"
                />
              </div>
              <button type="submit" disabled={loadingProductReview} className="btn-primary">
                {loadingProductReview ? "Submitting…" : "Submit Review"}
              </button>
            </form>
          ) : (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <p className="text-slate-500 text-sm mb-3">Sign in to share your review</p>
              <Link to="/login" className="btn-primary py-2 px-6 text-xs">Sign In</Link>
            </div>
          )}
        </div>
      )}

      {activeTab === 2 && (
        <div className="space-y-4 max-w-2xl">
          {product.reviews.length === 0 ? (
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200 text-center text-slate-400 text-sm">
              No reviews yet. Be the first!
            </div>
          ) : product.reviews.map((review) => (
            <div key={review._id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{review.name}</span>
                <span className="text-xs text-slate-400">{review.createdAt?.slice(0, 10)}</span>
              </div>
              <Ratings value={review.rating} />
              <p className="text-slate-600 text-sm leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 3 && (
        <div>
          {isLoading ? (
            <div className="flex justify-center py-10"><Loader /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl">
              {data?.map((p) => (
                <SmallProduct key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductTabs;
