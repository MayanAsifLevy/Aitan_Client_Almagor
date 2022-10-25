import React from "react";
import './genericTableStyle.css'
import { useTable, usePagination } from "react-table";
import { GoDiffAdded } from 'react-icons/go';
import { BsInfoCircle } from 'react-icons/bs';

const TableChanges = ({ columns, data, updateMyData, back_AddMore }) => {

  //in case we need to add more data to list of ADD TABLE (like add fruitName)
  const handleAddMore = () => {
    back_AddMore()
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page, which has only the rows for the active page

  } = useTable(
    {
      columns,
      data,
      updateMyData,
    },
    usePagination
  );


  return (
    <>
      <br />

      <table className='tableDataInfo' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (

              <tr className='tableData_tr' {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => {

                  return (
                    <th className='tableData_th' {...column.getHeaderProps({ style: { width: column.width } })}>
                      {column.render("Header")}
                      {/* ============= information section =============  */}
                      <span className="new-tooltip"  >
                        {headerGroup.headers[index].tipText ? <BsInfoCircle /> : ''}
                        {headerGroup.headers[index].tipText && (<span> {headerGroup.headers[index].tipText} </span>)}
                      </span>

                      {headerGroup.headers[index].canAdd2List ? "            " : ''}
                      {headerGroup.headers[index].canAdd2List ? <GoDiffAdded onClick={handleAddMore} /> : ''}

                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>


        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr className="trChanges" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className='tableData_td'{...cell.getCellProps({ style: { width: cell.column.width } })}> {cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>


      </table>

    </>
  );
}
export default TableChanges;
