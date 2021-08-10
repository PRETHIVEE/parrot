import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

// const Table = (props) => {
//   const { columns, sortColumn, onSort, data } = props;
const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className="table table-hover">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
