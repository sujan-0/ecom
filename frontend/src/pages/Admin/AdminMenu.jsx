import { NavLink } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineAppstore,
  AiOutlineShoppingCart,
  AiOutlineUnorderedList,
  AiOutlineTeam,
  AiOutlinePlusCircle,
} from "react-icons/ai";

const adminLinks = [
  { label: "Dashboard", to: "/admin/dashboard", icon: <AiOutlineDashboard size={16} /> },
  { label: "Add Product", to: "/admin/productlist", icon: <AiOutlinePlusCircle size={16} /> },
  { label: "All Products", to: "/admin/allproductslist", icon: <AiOutlineShoppingCart size={16} /> },
  { label: "Categories", to: "/admin/categorylist", icon: <AiOutlineAppstore size={16} /> },
  { label: "Orders", to: "/admin/orderlist", icon: <AiOutlineUnorderedList size={16} /> },
  { label: "Users", to: "/admin/userlist", icon: <AiOutlineTeam size={16} /> },
];

const AdminMenu = () => (
  <aside className="w-full lg:w-56 flex-shrink-0">
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-4 py-4 border-b border-slate-100">
        <p className="text-[10px] font-black text-brand-600 tracking-[0.3em] uppercase">Admin Panel</p>
      </div>
      <nav className="p-2">
        {adminLinks.map(({ label, to, icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                ? "bg-brand-50 text-brand-700 font-semibold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`
            }
          >
            <span className="text-slate-400">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  </aside>
);

export default AdminMenu;
