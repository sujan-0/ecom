import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="min-h-screen bg-transparent flex flex-col selection:bg-emerald-500/20 selection:text-emerald-400 font-inter">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        theme="dark"
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <Navigation />
      <main className="flex-grow pt-32 pb-40 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1440px] mx-auto animate-fade-in">
          <Outlet />
        </div>
      </main>
      <footer className="py-20 border-t border-white/5 bg-black/40 text-center text-gray-700 text-[10px] tracking-[0.4em] font-black uppercase">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-col items-center gap-2">
              <span className="text-white font-black tracking-tighter text-2xl uppercase">Mero<span className="text-emerald-500">Store</span></span>
              <span className="text-emerald-500/40 text-[8px] tracking-[0.6em]">OFFICIAL STORE</span>
            </div>
            <p className="max-w-md text-gray-700 font-medium tracking-tight text-sm">Your premium destination for high-quality products. Curated collections for the modern lifestyle.</p>
            <p>&copy; {new Date().getFullYear()} MERO STORE. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
