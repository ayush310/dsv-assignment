import { userSchema } from "../config/userSchema";

const UserList = ({ users, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="user-list-loading">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">👥</div>
        <h3>No users yet</h3>
        <p>Create your first user to get started</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h2>Users ({users.length})</h2>
      </div>

      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-card-header">
              <div className="user-avatar">
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </div>
              <div className="user-info">
                <h3 className="user-name">
                  {user.firstName} {user.lastName}
                </h3>
                <div className="user-details">
                  {userSchema.map((field) => {
                    if (
                      field.name === "firstName" ||
                      field.name === "lastName"
                    ) {
                      return null;
                    }
                    return (
                      <div key={field.name} className="detail-item">
                        <span className="detail-label">{field.label}:</span>
                        <span className="detail-value">{user[field.name]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="user-actions">
              <button
                onClick={() => onEdit(user)}
                className="btn-icon edit"
                aria-label="Edit user"
                title="Edit"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M11.333 2A1.886 1.886 0 0114 4.667l-9 9-3.667 1 1-3.667 9-9z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDelete(user)}
                className="btn-icon delete"
                aria-label="Delete user"
                title="Delete"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 4h12M5.333 4V2.667a1.333 1.333 0 011.334-1.334h2.666a1.333 1.333 0 011.334 1.334V4m2 0v9.333a1.333 1.333 0 01-1.334 1.334H4.667a1.333 1.333 0 01-1.334-1.334V4h9.334z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
