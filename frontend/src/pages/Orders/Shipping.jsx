import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress, savePaymentMethod } from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";
import { AiOutlineHome, AiOutlineEnvironment } from "react-icons/ai";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress.address) navigate("/shipping");
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <ProgressSteps step1 step2 />

      <div className="mt-12">
        <div className="mb-8">
          <p className="text-overline text-brand-500 mb-2">Checkout</p>
          <h1 className="font-display text-3xl text-slate-900">Shipping Details</h1>
          <p className="text-slate-500 mt-2 text-sm">Where should we deliver your order?</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
            <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <AiOutlineHome className="text-brand-500" size={16} />
              Delivery Address
            </h2>

            <div>
              <label className="form-label" htmlFor="address">Street Address</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 123 Main Street, Apt 4B"
                required
                className="form-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label" htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label" htmlFor="postalCode">Postal Code</label>
                <input
                  id="postalCode"
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="00000"
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div>
              <label className="form-label" htmlFor="country">Country</label>
              <input
                id="country"
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country"
                required
                className="form-input"
              />
            </div>
          </div>

          {/* Payment method */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-700">Payment Method</h2>
            <label className="flex items-center gap-4 p-4 rounded-xl border-2 border-brand-500 bg-brand-50 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-brand-500"
              />
              <div>
                <p className="text-sm font-semibold text-slate-900">PayPal or Credit Card</p>
                <p className="text-xs text-slate-500 mt-0.5">Secure payment via PayPal</p>
              </div>
            </label>
          </div>

          <button type="submit" className="btn-primary w-full py-4">
            Continue to Order Review →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
