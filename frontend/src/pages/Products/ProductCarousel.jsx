import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-4">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error || "An error occurred"}
        </Message>
      ) : (
        <Slider
          {...settings}
          className="w-full"
        >
          {products?.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="outline-none">
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-sm object-cover h-[30rem] border border-white/5"
                />

                <div className="mt-8 flex flex-col md:flex-row justify-between gap-8 px-4">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{name}</h2>
                    <p className="text-2xl font-bold text-emerald-500">NRP {price}</p>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed max-w-lg">
                      {description.substring(0, 170)}...
                    </p>
                  </div>

                  <div className="flex gap-12 h-fit">
                    <div className="space-y-4">
                      <div className="flex items-center text-[10px] font-bold tracking-[0.2em] text-gray-600 uppercase">
                        <FaClock className="mr-3 text-emerald-500" /> {moment(createdAt).fromNow()}
                      </div>
                      <div className="flex items-center text-[10px] font-bold tracking-[0.2em] text-gray-600 uppercase">
                        <FaStar className="mr-3 text-emerald-500" /> {numReviews} Reviews
                      </div>
                      <div className="flex items-center text-[10px] font-bold tracking-[0.2em] text-gray-600 uppercase">
                        <FaStar className="mr-3 text-emerald-500" /> {Math.round(rating)} Rating
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center text-[10px] font-bold tracking-[0.2em] text-gray-600 uppercase">
                        <FaShoppingCart className="mr-3 text-emerald-500" /> {quantity} Units
                      </div>
                      <div className="flex items-center text-[10px] font-bold tracking-[0.2em] text-gray-600 uppercase">
                        <FaBox className="mr-3 text-emerald-500" /> {countInStock} In Stock
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
