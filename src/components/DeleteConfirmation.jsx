const DeleteConfirmation = ({ user, onConfirm, onCancel, isDeleting }) => {
  return (
    <div className="delete-confirmation">
      <div className="delete-icon">⚠️</div>
      <h2>Delete User</h2>
      <p className="delete-message">
        Are you sure you want to delete{" "}
        <strong>
          {user.firstName} {user.lastName}
        </strong>
        ?
      </p>
      <p className="delete-warning">This action cannot be undone.</p>

      <div className="delete-actions">
        <button
          onClick={onCancel}
          className="btn btn-secondary"
          disabled={isDeleting}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="btn btn-danger"
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <span className="spinner"></span>
              Deleting...
            </>
          ) : (
            "Delete User"
          )}
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
