import React from 'react'

export const ColumnFilter = ({ column }) => {


  const { filterValue, setFilter } = column

  return (
    <span >
      <input style={{width: '4.5rem', fontSize: '1rem'}} value={filterValue || ''} onChange={e => setFilter(e.target.value || undefined)} />

    </span>
  )
}
