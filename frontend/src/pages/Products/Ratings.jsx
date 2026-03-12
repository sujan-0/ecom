import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text }) => {
  const fullStars = Math.floor(value);
  const halfStar = value - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => <FaStar key={i} className="text-amber-400" size={14} />)}
      {halfStar === 1 && <FaStarHalfAlt className="text-amber-400" size={14} />}
      {[...Array(emptyStars)].map((_, i) => <FaRegStar key={i + 10} className="text-slate-300" size={14} />)}
      {text && <span className="ml-2 text-xs text-slate-500 font-medium">{text}</span>}
    </div>
  );
};

export default Ratings;
