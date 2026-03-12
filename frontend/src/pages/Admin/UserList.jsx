import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  useEffect(() => { refetch(); }, [refetch]);

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await deleteUser(id);
      refetch();
      toast.success("User deleted");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({ userId: id, username: editableUserName, email: editableUserEmail });
      setEditableUserId(null);
      refetch();
      toast.success("User updated");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

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
          <h1 className="font-display text-3xl text-slate-900">Users</h1>
          <p className="text-slate-500 text-sm mt-1">{users?.length} registered users</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user._id}>
                    <td>
                      {editableUserId === user._id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editableUserName}
                            onChange={(e) => setEditableUserName(e.target.value)}
                            className="form-input py-1.5 text-sm"
                          />
                          <button onClick={() => updateHandler(user._id)} className="w-8 h-8 bg-brand-500 text-white rounded-lg flex items-center justify-center hover:bg-brand-600 transition-colors">
                            <FaCheck size={11} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-slate-900">{user.username}</span>
                          <button onClick={() => toggleEdit(user._id, user.username, user.email)} className="text-slate-400 hover:text-slate-700 transition-colors">
                            <FaEdit size={13} />
                          </button>
                        </div>
                      )}
                    </td>
                    <td>
                      {editableUserId === user._id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="email"
                            value={editableUserEmail}
                            onChange={(e) => setEditableUserEmail(e.target.value)}
                            className="form-input py-1.5 text-sm"
                          />
                          <button onClick={() => updateHandler(user._id)} className="w-8 h-8 bg-brand-500 text-white rounded-lg flex items-center justify-center hover:bg-brand-600 transition-colors">
                            <FaCheck size={11} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <a href={`mailto:${user.email}`} className="text-slate-600 hover:text-brand-600 transition-colors text-sm">{user.email}</a>
                          <button onClick={() => toggleEdit(user._id, user.username, user.email)} className="text-slate-400 hover:text-slate-700 transition-colors">
                            <FaEdit size={13} />
                          </button>
                        </div>
                      )}
                    </td>
                    <td>
                      {user.isAdmin
                        ? <span className="badge-brand"><FaCheck size={9} /> Admin</span>
                        : <span className="text-slate-400 text-xs"><FaTimes size={9} className="inline" /> User</span>}
                    </td>
                    <td>
                      {!user.isAdmin && (
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="w-8 h-8 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors"
                        >
                          <FaTrash size={12} />
                        </button>
                      )}
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

export default UserList;
