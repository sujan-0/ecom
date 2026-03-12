import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => dispatch(addToCart({ ...product, qty }));
  const removeFromCartHandler = (id) => dispatch(removeFromCart(id));
  const checkoutHandler = () => navigate("/login?redirect=/shipping");

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-brand-50 flex items-center justify-center mb-6">
          <AiOutlineShopping className="text-brand-500" size={36} />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 text-sm mb-8 max-w-xs">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <p className="text-overline text-brand-500 mb-2">Checkout</p>
        <h1 className="font-display text-3xl text-slate-900">Shopping Cart</h1>
        <p className="text-slate-500 text-sm mt-1">{itemCount} {itemCount === 1 ? "item" : "items"}</p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
        {/* Items */}
        <div className="lg:col-span-8 space-y-3">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center gap-5 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-brand-300 transition-all">
              <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <Link to={`/product/${item._id}`} className="font-semibold text-slate-900 hover:text-brand-600 transition-colors text-sm line-clamp-1">
                  {item.name}
                </Link>
                <p className="text-xs text-slate-400 mt-0.5">Unit price: NRP {item.price?.toLocaleString()}</p>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <select
                  value={item.qty}
                  onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                  className="form-input w-20 py-2 text-sm text-center"
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>

                <span className="text-sm font-bold text-slate-900 w-20 text-right">
                  NRP {(item.qty * item.price).toLocaleString()}
                </span>

                <button
                  onClick={() => removeFromCartHandler(item._id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <FaTrash size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-4 h-fit sticky top-24">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <h2 className="font-bold text-slate-900">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-medium text-slate-900">NRP {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="text-brand-600 font-medium">Free</span>
              </div>
              <div className="divider" />
              <div className="flex justify-between font-bold text-base text-slate-900">
                <span>Total</span>
                <span>NRP {subtotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
              className="btn-primary w-full py-4"
            >
              Proceed to Checkout →
            </button>

            <p className="text-center text-xs text-slate-400">🔒 Secure checkout · SSL encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
