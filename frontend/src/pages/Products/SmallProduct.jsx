import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-full max-w-[15rem] p-3 hover:scale-105 transition-transform duration-300">
      <div className="relative overflow-hidden rounded-lg shadow-md">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-32 object-cover rounded-lg"
        />
        <HeartIcon product={product} />
      </div>

      <div className="py-2">
        <Link to={`/product/${product._id}`}>
          <h2 className="flex flex-col gap-1 group">
            <div className="text-sm font-medium text-gray-200 group-hover:text-pink-400 transition-colors truncate">
              {product.name}
            </div>
            <span className="bg-pink-600/10 text-pink-500 text-xs font-bold w-fit px-2 py-0.5 rounded-full border border-pink-500/20">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
