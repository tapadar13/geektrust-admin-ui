import React, { useState } from "react";
import "../styles/usertable.css";

const UserTable = ({ users, onCheck, onDelete, setUsers }) => {
  const [updateUser, setUpdateUser] = useState(-1);

  const handleEdit = (id) => {
    setUpdateUser(id);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdateUser(-1);
  };

  return (
    <form onSubmit={handleUpdate}>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name="allSelected"
                checked={
                  users.filter((user) => user.isChecked !== true).length < 1
                }
                onChange={onCheck}
                className="checkbox"
              />
            </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            updateUser === user.id ? (
              <Edit user={user} users={users} setUsers={setUsers} />
            ) : (
              <tr key={user.id} className={user.isChecked ? "table-row" : ""}>
                <td className="table-cell">
                  <input
                    type="checkbox"
                    name={user.id}
                    checked={user?.isChecked || false}
                    onChange={onCheck}
                  />
                </td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleEdit(user.id)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    id={user.id}
                    onClick={onDelete}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </form>
  );
};

const Edit = ({ user, users, setUsers }) => {
  const handleInputChange = (e) => {
    const newUsers = users.map((u) =>
      u.id === user.id ? { ...u, [e.target.name]: e.target.value } : u
    );
    setUsers(newUsers);
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          onChange={handleInputChange}
          name="name"
          value={user.name}
        />
      </td>
      <td>
        <input
          type="text"
          onChange={handleInputChange}
          name="email"
          value={user.email}
        />
      </td>
      <td>
        <input
          type="text"
          onChange={handleInputChange}
          name="role"
          value={user.role}
        />
      </td>
      <td>
        <button type="submit" className="update-btn">
          Update
        </button>
      </td>
    </tr>
  );
};

export default UserTable;
