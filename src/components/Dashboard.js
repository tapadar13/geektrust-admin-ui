import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";
import "../styles/pagination.css";
import config from "../constants/config";
import UserTable from "./UserTable";
import Searchbar from "./Searchbar";
import Loader from "./Loader";
import DeleteButton from "./DeleteButton";
import Pagination from "./Pagination";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      let response = await axios.get(config.apiEndpoint);
      setLoading(false);
      setUsers(response.data);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOnCheck = (e) => {
    console.log(e.target.checked);
    const { name, checked } = e.target;
    if (name === "allSelected") {
      let tempUsers = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUsers);
    } else {
      let tempUsers = users.map((user) =>
        user.id === name ? { ...user, isChecked: checked } : user
      );
      setUsers(tempUsers);
    }
  };

  const handleDelete = (e) => {
    const { id } = e.target;
    console.log(id);
    let filteredUsers = users.filter((user) => user.id !== id);
    setUsers(filteredUsers);
  };

  const handleDeleteSelected = () => {
    let filteredUsers = users.filter((user) => !user.isChecked);
    setUsers(filteredUsers);
  };

  // Searchbar
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newUsers = users.filter((user) => {
        return Object.values(user)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newUsers);
    } else {
      setSearchResults(users);
    }
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      <Searchbar term={searchTerm} searchKeyword={searchHandler} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <UserTable
            users={searchTerm.length < 1 ? currentUsers : searchResults}
            setUsers={setUsers}
            onCheck={handleOnCheck}
            onDelete={handleDelete}
          />
          <div className="divElem">
            <DeleteButton
              users={users}
              onDeleteSelected={handleDeleteSelected}
            />
            <Pagination
              className="pagination"
              usersPerPage={usersPerPage}
              totalUsers={users.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
