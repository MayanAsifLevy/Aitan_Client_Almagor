import React from "react";
import './genericTableStyle.css'
import { useTable, useSortBy, useFilters } from "react-table";
import { ColumnFilter } from './ColumnFilter'


const Table = ({ columns, data, rowProps }) => {

  const defaultColumn = React.useMemo(
    () => {
      return {
        Filter: ColumnFilter
      }
    },
    []
  )



  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows, // Instead of using 'rows', we'll use page, which has only the rows for the active page (part of pagination process)

  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageIndex: 0,
      }
    },
    useFilters,
    useSortBy,

  );


  return (
    <>

      <table className='tableDataInfo aggregation' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => {
            return (

              <tr className='tableData_tr' {...headerGroup.getHeaderGroupProps()} key={i}>
                {headerGroup.headers.map((column, index) => {

                  return (
                    <th className='tableData_th' {...column.getHeaderProps({ style: { fontWeight: 'bold', width: column.width } })} key={index}>
                      {column.render("Header")}


                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>


        <tbody {...getTableBodyProps()}>
          {rows.map((row, b) => {
            prepareRow(row);
            return (
              <tr className='tableData_tr' {...row.getRowProps(rowProps(row))} key={b}>
                {row.cells.map((cell, c) => {
                  return (
                    <td className='tableData_td'{...cell.getCellProps({ style: { width: cell.column.width } })} key={c}>   {cell.render("Cell")} </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />



    </>
  );
}
export default Table;
