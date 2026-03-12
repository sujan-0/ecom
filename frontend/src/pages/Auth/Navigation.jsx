import { useState, useRef, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineMenu,
} from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setDropdownOpen(false);
      setMobileOpen(false);
      navigate("/login");
    } catch (err) { console.error(err); }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery.trim()}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const cartCount = cartItems.reduce((a, c) => a + c.qty, 0);

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-[100] h-16 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-slate-200"
          : "bg-white/80 backdrop-blur-md border-b border-slate-100"
        }`}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 h-full flex items-center justify-between gap-8">
          {/* Brand */}
          <Link to="/" className="flex-shrink-0" onClick={() => setMobileOpen(false)}>
            <span className="text-xl font-black tracking-tighter uppercase text-slate-900">
              Mero<span className="text-brand-500">Store</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.18em] uppercase">
            <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors link-hover">Home</Link>
            <Link to="/shop" className="text-slate-500 hover:text-slate-900 transition-colors link-hover">Shop</Link>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              <AiOutlineSearch size={19} />
            </button>

            <Link to="/favorite" className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">
              <FaHeart size={16} />
              <FavoritesCount />
            </Link>

            <Link to="/cart" className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all">
              <AiOutlineShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-brand-500 text-white text-[9px] font-black rounded-full flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User dropdown (desktop) */}
            <div className="hidden sm:block ml-1">
              {userInfo ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 h-9 px-3 rounded-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-all text-xs font-semibold"
                  >
                    <div className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center">
                      <AiOutlineUser className="text-brand-600" size={12} />
                    </div>
                    <span className="capitalize max-w-[90px] truncate">{userInfo.username}</span>
                    <FiChevronDown size={12} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden animate-slide-down">
                      {userInfo.isAdmin && (
                        <div className="px-3 py-2 border-b border-slate-100">
                          <p className="text-[9px] font-black text-brand-600 tracking-[0.3em] uppercase px-2 py-1">Admin</p>
                          {[
                            { label: "Dashboard", to: "/admin/dashboard" },
                            { label: "Products", to: "/admin/productlist" },
                            { label: "Categories", to: "/admin/categorylist" },
                            { label: "Orders", to: "/admin/orderlist" },
                            { label: "Users", to: "/admin/userlist" },
                          ].map(({ label, to }) => (
                            <Link key={label} to={to} onClick={() => setDropdownOpen(false)}
                              className="block px-2 py-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-all">
                              {label}
                            </Link>
                          ))}
                        </div>
                      )}
                      <div className="px-3 py-2">
                        <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-2 py-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-all">My Profile</Link>
                        <Link to="/user-orders" onClick={() => setDropdownOpen(false)} className="block px-2 py-2 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-all">My Orders</Link>
                        <button onClick={logoutHandler} className="w-full text-left px-2 py-2 text-xs text-red-500 hover:bg-red-50 rounded transition-all mt-1">Sign Out</button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login" className="btn-secondary py-2 px-4 text-[10px]">Sign In</Link>
                  <Link to="/register" className="btn-primary  py-2 px-4 text-[10px]">Register</Link>
                </div>
              )}
            </div>

            {/* Mobile burger */}
            <button className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-28 px-6"
          onClick={(e) => e.target === e.currentTarget && setSearchOpen(false)}>
          <div className="w-full max-w-2xl animate-scale-in">
            <form onSubmit={handleSearch} className="relative">
              <AiOutlineSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
              <input ref={searchRef} type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full py-5 pl-14 pr-14 bg-white border border-slate-200 rounded-2xl text-slate-900 text-lg placeholder-slate-400 shadow-xl focus:outline-none focus:border-brand-500 transition-colors" />
              <button type="button" onClick={() => setSearchOpen(false)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
                <AiOutlineClose size={20} />
              </button>
            </form>
            <p className="text-center text-xs text-white/60 mt-4">Press Enter to search · Esc to close</p>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[90] bg-white pt-16 flex flex-col sm:hidden animate-fade-in">
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
            <div className="space-y-1">
              {[{ label: "Home", to: "/" }, { label: "Shop", to: "/shop" }, { label: "Cart", to: "/cart" }, { label: "Wishlist", to: "/favorite" }].map(({ label, to }) => (
                <Link key={label} to={to} onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition-all">
                  {label}
                </Link>
              ))}
            </div>
            {userInfo ? (
              <div className="space-y-1 border-t border-slate-100 pt-6">
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase px-4 pb-2">{userInfo.username}</p>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="flex items-center px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all text-sm">My Profile</Link>
                <Link to="/user-orders" onClick={() => setMobileOpen(false)} className="flex items-center px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all text-sm">My Orders</Link>
                {userInfo.isAdmin && (
                  <>
                    <p className="text-[10px] font-black text-brand-600 tracking-widest uppercase px-4 pt-4 pb-2">Admin</p>
                    {[{ label: "Dashboard", to: "/admin/dashboard" }, { label: "Products", to: "/admin/productlist" }, { label: "Orders", to: "/admin/orderlist" }].map(({ label, to }) => (
                      <Link key={label} to={to} onClick={() => setMobileOpen(false)} className="flex items-center px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all text-sm">{label}</Link>
                    ))}
                  </>
                )}
                <button onClick={logoutHandler} className="w-full text-left px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all text-sm mt-2">Sign Out</button>
              </div>
            ) : (
              <div className="space-y-3 border-t border-slate-100 pt-6">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-secondary w-full">Sign In</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary w-full">Create Account</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
