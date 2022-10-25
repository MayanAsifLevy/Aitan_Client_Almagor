import React from "react";
import './genericTableStyle.css'
import { useTable, usePagination, useSortBy, useFilters } from "react-table";
import { ColumnFilter } from './ColumnFilter'
import { BsInfoCircle } from 'react-icons/bs';
import { TbFilterOff } from 'react-icons/tb';
import { TiArrowSortedUp, TiArrowSortedDown, TiArrowUnsorted } from 'react-icons/ti';


const Table = ({ columns, data, numOfRecords, tableSortBy }) => {

  const defaultColumn = React.useMemo(
    () => {
      return {
        Filter: ColumnFilter
      }
    },
    []
  )

  const numRecords = parseInt(numOfRecords)

  const numPageList = (numRecords < 10 ? [numRecords, 10, 20, 30, 40, 50] :
    numRecords >= 10 && numRecords < 20 ? [numRecords, 20, 30, 40, 50] :
      numRecords >= 20 && numRecords < 30 ? [numRecords, 30, 40, 50] :
        numRecords >= 30 && numRecords < 40 ? [numRecords, 40, 50] :
          [numRecords, 50])



  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setAllFilters,
    page, // Instead of using 'rows', we'll use page, which has only the rows for the active page (part of pagination process)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageSize: numRecords,
        pageIndex: 0,
        sortBy: tableSortBy
      }
    },
    useFilters,
    useSortBy,
    usePagination
  );


  return (
    <>

      <table className='tableDataInfo' {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (

              <tr className='tableData_tr' {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => {

                  return (
                    <th className='tableData_th'{...column.getHeaderProps({ style: { width: column.width } })}>
                      {column.render("Header")}

                      {/* ============= sort section ============= */}
                      <span {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.isSorted ?
                          column.isSortedDesc ? <TiArrowSortedDown /> : column.isSortedDesc === false ? <TiArrowSortedUp /> : <TiArrowUnsorted />
                          : column.id !== "action" && column.id !== "costview" ?
                            column.isSortedDesc ? <TiArrowSortedUp /> : column.isSortedDesc === false ? <TiArrowSortedDown /> : <TiArrowUnsorted />
                            : ""
                        }
                      </span>


                      {/* ============= information section =============  */}
                      <span className="new-tooltip"  >
                        {headerGroup.headers[index].tipText ? <BsInfoCircle /> : ''}
                        {headerGroup.headers[index].tipText && (<span> {headerGroup.headers[index].tipText} </span>)}
                      </span>


                      {/* ============= add reset filter above the actions column ============= */}
                      <span >
                        {column.id === "action" ? <button className='unfilterButton' onClick={() => setAllFilters([])}><TbFilterOff /></button> : ''}
                      </span>

                      <br />


                      {/* ============= filter section ============= */}
                      <span className="filterContainer">
                        {/* <div>
                          {column.canFilter ? <button className='filterButton' onClick={() => handelFilter(headerGroup.headers[index])} ><VscFilter /> </button> : null}
                        </div> */}
                        <div>
                          {headerGroup.headers[index].canFilter ? headerGroup.headers[index].render('Filter') : ''}

                        </div>
                      </span>

                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>


        <tbody className='tableofInfo' {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr className='tableData_tr' {...row.getRowProps(/*getTrProps*/)}>
                {row.cells.map((cell) => {
                  return (
                    <td className='tableData_td'{...cell.getCellProps({ style: { width: cell.column.width } })}>   {cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />


      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"עמוד ראשון"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"קודם"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {"הבא"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {"עמוד אחרון"}
        </button>{" "}

        <span style={{ marginRight: '30px' }}>

          עמוד{" "}
          <strong>
            {pageIndex + 1} מתוך {pageOptions.length}
          </strong>
        </span>

        <span style={{ marginRight: '30px' }}>

          <select style={{ padding: '4%' }} value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)) }}>
            {numPageList.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                הראה {pageSize}
              </option>
            ))}
          </select>
        </span>

        <span style={{ marginRight: '30px' }}>
          גש לעמוד:
          <input type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "20%" }}
          />
        </span>

      </div>
    </>
  );
}
export default Table;
