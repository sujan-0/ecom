import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-full max-w-[20rem] p-3 hover:scale-105 transition-transform duration-300">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <HeartIcon product={product} />
      </div>

      <div className="py-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center group">
            <div className="text-lg font-medium text-white group-hover:text-pink-500 transition-colors">
              {product.name}
            </div>
            <span className="bg-pink-600/20 text-pink-400 text-sm font-semibold px-3 py-1 rounded-full border border-pink-500/30">
              $ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
