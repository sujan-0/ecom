import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import AdminMenu from "./AdminMenu";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name) { toast.error("Category name is required"); return; }
    try {
      const res = await createCategory({ name }).unwrap();
      if (res.error) { toast.error(res.error); return; }
      setName("");
      toast.success(`"${res.name}" created`);
    } catch { toast.error("Failed to create category"); }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!updatingName) { toast.error("Category name is required"); return; }
    try {
      const res = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: { name: updatingName },
      }).unwrap();
      if (res.error) { toast.error(res.error); return; }
      toast.success(`"${res.name}" updated`);
      setSelectedCategory(null); setUpdatingName(""); setModalVisible(false);
    } catch { toast.error("Failed to update category"); }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteCategory(selectedCategory._id).unwrap();
      if (res.error) { toast.error(res.error); return; }
      toast.success(`"${res.name}" deleted`);
      setSelectedCategory(null); setModalVisible(false);
    } catch { toast.error("Failed to delete category"); }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-fade-in">
      <AdminMenu />

      <div className="flex-1 space-y-8">
        <div>
          <p className="text-overline text-brand-500 mb-1">Management</p>
          <h1 className="font-display text-3xl text-slate-900">Categories</h1>
          <p className="text-slate-500 text-sm mt-1">{categories?.length || 0} categories</p>
        </div>

        {/* Create form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-sm font-bold text-slate-700 mb-4">Add New Category</h2>
          <form onSubmit={handleCreate} className="flex gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name…"
              className="form-input flex-1"
            />
            <button type="submit" className="btn-primary gap-2 px-5">
              <AiOutlinePlus size={16} />
              Add
            </button>
          </form>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {categories?.map((category) => (
            <button
              key={category._id}
              onClick={() => {
                setModalVisible(true);
                setSelectedCategory(category);
                setUpdatingName(category.name);
              }}
              className="group flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-slate-200 hover:border-brand-400 hover:bg-brand-50 transition-all text-sm font-medium text-slate-700 hover:text-brand-700 shadow-sm"
            >
              <span>{category.name}</span>
              <AiOutlineEdit size={14} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Edit modal */}
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <div className="p-6 space-y-5">
          <h3 className="text-lg font-bold text-slate-900">Edit Category</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="form-label">Category Name</label>
              <input
                type="text"
                value={updatingName}
                onChange={(e) => setUpdatingName(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary flex-1">Update</button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <AiOutlineDelete size={14} />
                Delete
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryList;
