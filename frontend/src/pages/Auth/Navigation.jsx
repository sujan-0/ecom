import { useState, useRef, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { FaHeart, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setDropdownOpen(false);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-[100] h-16 flex items-center bg-black/80 backdrop-blur-md border-b border-white/5 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto w-full flex justify-between items-center">
        {/* Brand Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl font-black tracking-tighter text-white uppercase font-inter leading-none">
            Mero<span className="text-emerald-500">Store</span>
          </span>
        </Link>

        {/* Integrated Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-[10px] font-bold tracking-[0.3em] text-gray-500 hover:text-white transition-all uppercase link-underline">
            Home
          </Link>
          <Link to="/shop" className="text-[10px] font-bold tracking-[0.3em] text-gray-500 hover:text-white transition-all uppercase link-underline">
            Collections
          </Link>
          <div className="w-px h-4 bg-white/10" />
          <Link to="/favorite" className="relative group">
            <FaHeart size={20} className="text-gray-500 group-hover:text-emerald-500 transition-colors" />
            <FavoritesCount />
          </Link>
          <Link to="/cart" className="relative group">
            <AiOutlineShoppingCart size={20} className="text-gray-500 group-hover:text-emerald-500 transition-colors" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-500 text-[10px] font-bold text-black rounded-full flex items-center justify-center">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>
        </div>

        {/* User Hub */}
        <div className="flex items-center gap-6">
          {userInfo ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 text-sm font-bold tracking-tight text-white hover:text-emerald-500 transition-all border border-white/5 px-3 py-1.5 rounded-sm hover:border-emerald-500/20"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <AiOutlineUser className="text-emerald-500" size={14} />
                </div>
                <span className="hidden sm:block capitalize">{userInfo.username}</span>
                <FaChevronDown size={10} className={`transform transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-zinc-950 border border-white/5 rounded-sm shadow-2xl p-2 animate-fade-in translate-y-1">
                  {userInfo.isAdmin && (
                    <div className="mb-1 border-b border-white/5 pb-1">
                      <span className="block px-4 py-2 text-[9px] font-black text-emerald-500 tracking-[0.4em] uppercase opacity-60">ADMINISTRATION</span>
                      <Link to="/admin/dashboard" className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-all" onClick={() => setDropdownOpen(false)}>System Summary</Link>
                      <Link to="/admin/productlist" className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-all" onClick={() => setDropdownOpen(false)}>Product Inventory</Link>
                      <Link to="/admin/categorylist" className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-all" onClick={() => setDropdownOpen(false)}>Class Definitions</Link>
                      <Link to="/admin/orderlist" className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-all" onClick={() => setDropdownOpen(false)}>Order Logistics</Link>
                    </div>
                  )}
                  <div className="pt-1">
                    <Link to="/profile" className="block px-4 py-2 text-xs text-gray-400 hover:text-white hover:bg-white/5 rounded-sm transition-all" onClick={() => setDropdownOpen(false)}>Personal Details</Link>
                    <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-red-500/10 rounded-sm transition-all mt-1">Terminate Session</button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-[10px] font-black text-gray-500 hover:text-white tracking-[0.2em] uppercase transition-all px-4 py-2 bg-white/5 hover:bg-white/10 rounded-sm">
                Sign In
              </Link>
              <Link to="/register" className="bg-emerald-500 text-black px-6 py-2 rounded-sm text-[10px] font-black tracking-[0.2em] transition-all hover:bg-emerald-400 uppercase">
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
