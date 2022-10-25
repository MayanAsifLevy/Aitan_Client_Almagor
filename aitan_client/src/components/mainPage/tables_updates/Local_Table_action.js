import React from 'react';
import '../mainPageStyle.css'
import { useNavigate } from 'react-router-dom';


const LocalTableAction = () => {
    const tables_list = [{ table_eng: 'deliveryNote', table_name: 'תעודת משלוח' },
    { table_eng: 'manufacturerInvoice', table_name: 'חשבונית יצרן' },
    { table_eng: 'closingData', table_name: 'נתוני סגירה' },
    { table_eng: 'invoices', table_name: 'חשבונית' },
    { table_eng: 'receipts', table_name: 'קבלה' }
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

export default LocalTableAction;