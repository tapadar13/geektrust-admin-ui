import React from "react";
import "../styles/deletebutton.css";

const DeleteButton = ({ onDeleteSelected }) => {
  return <button type="button" onClick={onDeleteSelected} className="delete-button">Delete Selected</button>;
};

export default DeleteButton;
