import React from 'react';
import '../mainPageStyle.css'
import { useNavigate } from 'react-router-dom';


const LocalTableInfra = () => {
    const tables_list = [{ table_eng: 'fruitSize', table_name: 'גדלים' },
    { table_eng: 'fruits', table_name: 'סוגי פירות' },
    { table_eng: 'marketFruits', table_name: 'פירות (שיווק)' },
    { table_eng: 'palletsMat', table_name: 'משטחים' },
    // { table_eng: 'palletsMatCost', table_name: 'עלות משטח' },
    { table_eng: 'marketPackingMat', table_name: 'אריזות (שיווק)' },
    { table_eng: 'traders', table_name: 'סוחרים' },
    { table_eng: 'fixedInfo', table_name: 'מידע קבוע' }
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

export default LocalTableInfra;