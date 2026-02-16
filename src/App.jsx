import { useState, useEffect } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import Modal from "./components/Modal";
import DeleteConfirmation from "./components/DeleteConfirmation";
import Toast from "./components/Toast";
import { userService } from "./services/userService";

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleCreateUser = async (userData) => {
    try {
      setIsSubmitting(true);
      const newUser = await userService.createUser(userData);
      setUsers((prev) => [...prev, newUser]);
      setShowFormModal(false);
      showToast("User created successfully!");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      setIsSubmitting(true);
      const updatedUser = await userService.updateUser(
        selectedUser.id,
        userData,
      );
      setUsers((prev) =>
        prev.map((user) => (user.id === selectedUser.id ? updatedUser : user)),
      );
      setShowFormModal(false);
      setSelectedUser(null);
      showToast("User updated successfully!");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      setIsSubmitting(true);
      await userService.deleteUser(selectedUser.id);
      setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
      showToast("User deleted successfully!");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openCreateModal = () => {
    setSelectedUser(null);
    setShowFormModal(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setShowFormModal(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const closeFormModal = () => {
    if (!isSubmitting) {
      setShowFormModal(false);
      setSelectedUser(null);
    }
  };

  const closeDeleteModal = () => {
    if (!isSubmitting) {
      setShowDeleteModal(false);
      setSelectedUser(null);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="app-title">User Management</h1>
            <p className="app-subtitle">Manage your user database</p>
          </div>
          <button
            onClick={openCreateModal}
            className="btn btn-primary btn-create"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 4v12M4 10h12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Add User
          </button>
        </div>
      </header>

      <main className="app-main">
        <UserList
          users={users}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
          isLoading={isLoading}
        />
      </main>

      <Modal isOpen={showFormModal} onClose={closeFormModal} size="medium">
        <UserForm
          user={selectedUser}
          onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
          onCancel={closeFormModal}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <Modal isOpen={showDeleteModal} onClose={closeDeleteModal} size="small">
        {selectedUser && (
          <DeleteConfirmation
            user={selectedUser}
            onConfirm={handleDeleteUser}
            onCancel={closeDeleteModal}
            isDeleting={isSubmitting}
          />
        )}
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
