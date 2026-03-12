import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";

const Register = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const redirect = new URLSearchParams(search).get("redirect") || "/";

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Account created successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch -mt-28 -mx-6 md:-mx-12 lg:-mx-24">
      {/* ── Left: image panel ── */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Register"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to left, #09090b 0%, #09090b 5%, transparent 50%)" }} />

        <div className="absolute bottom-16 left-12 right-12">
          <div className="glass rounded-xl p-6 space-y-4">
            <p className="text-overline text-brand-400">Join MeroStore</p>
            <p className="text-white text-xl font-bold leading-snug">Exclusive member benefits await you</p>
            <ul className="space-y-2 pt-2">
              {["Free shipping on first order", "Early access to new arrivals", "Member-only discounts"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-zinc-400">
                  <span className="w-5 h-5 rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Right: form panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-md animate-fade-in">
          {/* Brand */}
          <Link to="/" className="inline-flex items-center gap-2 mb-12 group">
            <span className="text-2xl font-black tracking-tighter uppercase">
              Mero<span className="text-brand-500">Store</span>
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-10">
            <p className="text-overline text-brand-500 mb-3">Get started</p>
            <h1 className="font-display text-4xl text-white leading-tight">Create your account</h1>
            <p className="text-zinc-500 mt-3 text-sm">
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                className="text-brand-400 hover:text-brand-300 font-semibold transition-colors"
              >
                Sign in instead
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-5">
            {/* Name */}
            <div>
              <label className="form-label" htmlFor="name">Full name</label>
              <div className="relative">
                <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={17} />
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="form-input pl-10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="form-label" htmlFor="email">Email address</label>
              <div className="relative">
                <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={17} />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="form-label" htmlFor="password">Password</label>
              <div className="relative">
                <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={17} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input pl-10 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={17} /> : <AiOutlineEye size={17} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="form-label" htmlFor="confirmPassword">Confirm password</label>
              <div className="relative">
                <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={17} />
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="form-input pl-10"
                />
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={isLoading} className="btn-primary w-full mt-2">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account…
                </span>
              ) : "Create Account"}
            </button>
          </form>

          <p className="mt-10 text-center text-xs text-zinc-600">
            By registering you agree to our{" "}
            <span className="text-zinc-400 hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            {" & "}
            <span className="text-zinc-400 hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
