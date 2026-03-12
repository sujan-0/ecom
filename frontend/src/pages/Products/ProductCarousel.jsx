import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    fade: true,
  };

  if (isLoading) return null;
  if (error) return <Message variant="danger">{error?.data?.message || "Error loading products"}</Message>;

  return (
    <div className="h-[420px] lg:h-[520px] relative">
      <Slider {...settings} className="h-full rounded-2xl overflow-hidden">
        {products?.map(({ _id, image, name, price, description }) => (
          <div key={_id} className="relative h-[420px] lg:h-[520px] outline-none">
            {/* Background image */}
            <img
              src={image}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 inset-x-0 p-6 lg:p-10 text-white">
              <p className="text-overline text-brand-400 mb-2">Featured</p>
              <h2 className="font-display text-2xl lg:text-4xl leading-tight mb-2 text-white max-w-lg">
                {name}
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 max-w-md line-clamp-2">
                {description}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-2xl font-bold text-white">NRP {price?.toLocaleString()}</span>
                <Link
                  to={`/product/${_id}`}
                  className="btn-primary py-2.5 px-6 text-xs"
                >
                  Shop Now →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
