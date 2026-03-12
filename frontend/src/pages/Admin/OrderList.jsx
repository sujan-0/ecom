import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  if (isLoading) return (
    <div className="flex flex-col lg:flex-row gap-8">
      <AdminMenu />
      <div className="flex-1 flex justify-center items-center py-40"><Loader size="lg" /></div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col lg:flex-row gap-8">
      <AdminMenu />
      <div className="flex-1"><Message variant="danger">{error?.data?.message || error.error}</Message></div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-fade-in">
      <AdminMenu />

      <div className="flex-1 space-y-6">
        <div>
          <p className="text-overline text-brand-500 mb-1">Management</p>
          <h1 className="font-display text-3xl text-slate-900">Orders</h1>
          <p className="text-slate-500 text-sm mt-1">{orders?.length} orders total</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Delivery</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <img
                        src={order.orderItems[0]?.image}
                        alt="item"
                        className="w-12 h-12 rounded-lg object-cover border border-slate-100"
                      />
                    </td>
                    <td className="font-mono text-xs text-slate-400">{order._id.slice(-8)}</td>
                    <td className="font-medium text-slate-700">{order.user?.username || "N/A"}</td>
                    <td className="text-slate-500">{order.createdAt?.slice(0, 10)}</td>
                    <td className="font-semibold text-slate-900">NRP {order.totalPrice?.toLocaleString()}</td>
                    <td>
                      {order.isPaid
                        ? <span className="badge-brand">Paid</span>
                        : <span className="badge-danger">Unpaid</span>}
                    </td>
                    <td>
                      {order.isDelivered
                        ? <span className="badge-brand">Delivered</span>
                        : <span className="badge-danger">Pending</span>}
                    </td>
                    <td>
                      <Link
                        to={`/order/${order._id}`}
                        className="text-brand-600 hover:text-brand-700 text-xs font-semibold transition-colors"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
