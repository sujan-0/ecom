import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  if (isLoading) return (
    <div className="flex justify-center items-center py-40"><Loader size="lg" /></div>
  );
  if (error) return (
    <Message variant="danger">{error?.data?.error || error.error}</Message>
  );

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <p className="text-overline text-brand-500 mb-2">Account</p>
        <h1 className="font-display text-3xl text-slate-900">My Orders</h1>
        <p className="text-slate-500 text-sm mt-1">{orders?.length} orders placed</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 text-sm mb-4">You haven't placed any orders yet.</p>
          <Link to="/shop" className="btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Delivery</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <img
                        src={order.orderItems[0]?.image}
                        alt="order"
                        className="w-12 h-12 rounded-lg object-cover border border-slate-100"
                      />
                    </td>
                    <td className="font-mono text-xs text-slate-400">#{order._id.slice(-8)}</td>
                    <td className="text-slate-500 text-sm">{order.createdAt?.slice(0, 10)}</td>
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
                      <Link to={`/order/${order._id}`} className="text-brand-600 hover:text-brand-700 text-xs font-semibold transition-colors">
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrder;
