import { get } from "lodash";
import React, { useMemo } from "react";
import { useTable } from "react-table";
import COLUMNS from "./columns";
import MOCK_DATA from "./MOCK_DATA.json";
import "./Table.module.css";

const Table = ({ columns = [], data = [], rowFunc = () => {} }) => {
  // const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => MOCK_DATA, []);

  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          const data = row.values.ACTION;
          {
            /* let qty = row.values.quantity; */
          }
          return (
            <tr
              onClick={() => rowFunc(data)}
              // style={{ backgroundColor: "#FF9F9F" }}
              {...row.getRowProps()}
            >
              {get(row, "cells").map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
