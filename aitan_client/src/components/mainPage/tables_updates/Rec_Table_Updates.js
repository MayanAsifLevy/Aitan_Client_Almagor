import React from 'react';
import '../mainPageStyle.css'
import { useNavigate } from 'react-router-dom';


const Receive_Table_Updates = () => {
    const tables_list = [{ table_eng: 'growers', table_name: 'מגדלים' },
    { table_eng: 'fruits', table_name: 'פירות' },
    { table_eng: 'dealNames', table_name: 'שם עסקה' },
    { table_eng: 'deals', table_name: 'עסקאות' },
    { table_eng: 'plots', table_name: 'חלקות' },
    { table_eng: 'packingMaterials', table_name: 'אריזות' },
    { table_eng: 'packingHouse', table_name: 'בית אריזה' },
    ]


    const navigate = useNavigate()

    const checkHandler = (table) => {
        navigate(table.table.table_eng + '/')
    }


    return (
        <div className="update_container">
            {tables_list.map((table, index) => {
                return <li key={`tables_list${index}`} value={table.table_eng} >
                    <input type='button' className='updateButtons' value={table.table_name} onClick={() => checkHandler({ table })} />
                </li>
            })
            }
        </div>
    )
}

export default Receive_Table_Updates;