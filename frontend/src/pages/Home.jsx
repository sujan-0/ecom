import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, error, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <div className="container mx-auto px-4 mt-[2rem]">
            <div className="flex justify-between items-center ml-[2rem]">
              <h1 className="text-[3rem] font-semibold text-white">
                Special Products
              </h1>

              <Link
                to="/shop"
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full py-2 px-10 transition duration-300"
              >
                Shop
              </Link>
            </div>

            <div className="mt-[2rem]">
              <div className="flex justify-center flex-wrap">
                {data?.products?.map((product) => (
                  <div key={product._id} className="m-4">
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
