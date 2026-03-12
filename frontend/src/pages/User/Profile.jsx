import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlineShoppingCart } from "react-icons/ai";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [updateProfile, { isLoading }] = useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { toast.error("Passwords do not match"); return; }
    try {
      const res = await updateProfile({ _id: userInfo._id, username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-8">
        <p className="text-overline text-brand-500 mb-2">Account</p>
        <h1 className="font-display text-3xl text-slate-900">My Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Avatar card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
              <AiOutlineUser className="text-brand-600" size={36} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 capitalize">{userInfo.username}</h2>
            <p className="text-sm text-slate-500 mt-1">{userInfo.email}</p>
            {userInfo.isAdmin && <span className="badge-brand mt-3 inline-flex">Admin</span>}
          </div>

          {/* Quick links */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-1">
            <Link to="/user-orders" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all">
              <AiOutlineShoppingCart className="text-slate-400" size={17} />
              My Orders
            </Link>
            <Link to="/favorite" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all">
              <span className="text-slate-400 text-sm">♥</span>
              Wishlist
            </Link>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-base font-bold text-slate-900 mb-6">Update Information</h2>
            <form onSubmit={submitHandler} className="space-y-5">
              <div>
                <label className="form-label" htmlFor="name">Full Name</label>
                <div className="relative">
                  <AiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input id="name" type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Your name" className="form-input pl-10" />
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="email">Email Address</label>
                <div className="relative">
                  <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="form-input pl-10" />
                </div>
              </div>

              <div className="divider" />
              <p className="text-xs font-semibold text-slate-500 -mt-2">Change Password (leave blank to keep current)</p>

              <div>
                <label className="form-label" htmlFor="password">New Password</label>
                <div className="relative">
                  <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="form-input pl-10" />
                </div>
              </div>

              <div>
                <label className="form-label" htmlFor="confirmPassword">Confirm New Password</label>
                <div className="relative">
                  <AiOutlineLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" className="form-input pl-10" />
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" disabled={isLoading} className="btn-primary w-full">
                  {isLoading ? (
                    <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Saving…</span>
                  ) : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
