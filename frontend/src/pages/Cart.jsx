import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="fade-in max-w-[1440px] mx-auto px-6 md:px-12">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-40 border border-white/5 bg-black/20 rounded-sm">
          <p className="text-gray-500 font-bold tracking-widest uppercase mb-8">Your procurement list is empty</p>
          <Link to="/shop" className="bg-white text-black px-10 py-4 rounded-sm font-black text-[10px] tracking-[0.3em] uppercase hover:bg-emerald-500 transition-all">
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase font-inter leading-none">
              Shopping <span className="text-emerald-500">Cart</span>
            </h1>

            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-8 p-6 bg-zinc-900/40 border border-white/5 rounded-sm group hover:border-emerald-500/20 transition-all">
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-sm bg-zinc-950 border border-white/5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item._id}`} className="block text-lg font-bold text-white uppercase tracking-tight hover:text-emerald-500 transition-colors truncate">
                      {item.name}
                    </Link>
                    <div className="mt-1 text-[9px] font-black text-emerald-500/60 uppercase tracking-[0.2em]">Verified Asset</div>
                    <div className="mt-4 text-xl font-black text-white font-inter">
                      NRP {item.price}
                    </div>
                  </div>

                  <div className="flex items-center gap-10">
                    <div className="w-24 h-12">
                      <select
                        className="w-full h-full px-4 bg-white/5 border border-white/10 rounded-sm text-white font-black text-[10px] tracking-widest focus:border-emerald-500 transition-colors uppercase outline-none"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1} className="bg-zinc-900">
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      className="text-gray-700 hover:text-red-500 transition-colors"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-4 h-fit sticky top-32">
            <div className="p-10 border border-white/5 bg-zinc-900/40 rounded-sm space-y-10">
              <div className="space-y-2">
                <h2 className="text-xs font-black text-emerald-500 tracking-[0.4em] uppercase opacity-60">Order Summary</h2>
                <div className="flex justify-between items-baseline pt-4">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Total Items</span>
                  <span className="text-white font-black text-xl">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                </div>
              </div>

              <div className="space-y-6 pt-10 border-t border-white/5">
                <div className="flex flex-col gap-1">
                  <span className="text-gray-600 font-bold uppercase tracking-[0.2em] text-[9px]">Calculated Total</span>
                  <div className="text-4xl font-black text-white font-inter tracking-tighter">
                    NRP {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toLocaleString()}
                  </div>
                </div>

                <button
                  className="w-full bg-emerald-500 text-black font-black py-6 rounded-sm text-[10px] tracking-[0.4em] uppercase hover:bg-emerald-400 transition-all active:scale-95 disabled:bg-gray-800 disabled:text-gray-600 shadow-2xl"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Confirm & Checkout
                </button>

                <p className="text-[8px] text-gray-700 font-black uppercase text-center tracking-[0.2em]">Secure Checkout • Encrypted Transaction</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
