import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from 'react-redux';
import { addPlot } from '../../../redux/rec_fruit_actions/plotDunam/plotsDunam_actions'
import { loadFruits } from '../../../redux/rec_fruit_actions/fruits/fruits_actions'
import GenericAddPage from "../../general_comp/GenericAddPage";
import EditableCell from '../../general_comp/EditableCell'
import GenericListCreator from "../../general_comp/GenericListCreator";

const AddPlot = (props) => {

    const dispatch = useDispatch()

    let _token = useSelector(state => state.login.Token.token)

    let selected_season = useSelector(state => state.general.season)

    let fruitTypesList = useSelector(state => state.fruits.fruits)

    useEffect(() => {
        // must check if we already brought the data from store and if we did, we dont need to do it again
        if (fruitTypesList.length === 0) { dispatch(loadFruits(_token)) }
    }, [])

    const blankRecord = { season: selected_season, plotName: '', fruitTypeID:0, plantYear: selected_season, assamblyYear:'', 
                            dunam:0, plotOwner:'אחר',  isActive: 1 }

    let plot2Copy = useSelector(state => state.plots.plot_2_Copy)

    let [copyPlot, setCopyPlot] = useState(blankRecord)

    useEffect(() => {
        plot2Copy === '' ? setCopyPlot(blankRecord) : setCopyPlot(plot2Copy)
    }, [plot2Copy]) //2.8.22 add [plot2Copy]


    const cancelBack = () => {
        props.back()
    }


    // contain the data we changed and update the setCopyPlot   
    const updateMyData = (columnId, value) => {
        setCopyPlot((old) => {
            return {
                ...old,
                [columnId]: value,
            };
        }
        );
    };

     /**************************************************** */
     let fruitTypeList = useSelector(state => state.fruits.fruits)
     let fruitTypeLIsActiveList = GenericListCreator(fruitTypeList)
 
     const handleFruitsListSet = (optionID, list) => {
         let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))
        
         if (filteredRecord.length !== 0) {
            setCopyPlot({ ...copyPlot, fruitTypeID: filteredRecord[0].id, fruitName: filteredRecord[0].fruitName, fruitType: filteredRecord[0].fruitType })
        }
        else {
            setCopyPlot({ ...copyPlot, fruitTypeID:  'בחר',  fruitType:  'בחר' })
        }
     }

    
 
     /************ set plot owner drop down list **************************************** */
     let plotOwnerList = ['אחר','טיולי כורזים','רוני לוי']
  
     /*********** set year drop down list - decending***************************************** */
 
     const year = (new Date()).getFullYear();
     const minYear = 2000;
     const diff=year+2-minYear;
     let years = [null];
 
     for(let x = 0; x <diff; x++) {
         years.push((year+2 - x))
     }
 
 
 
     /**************************************************** */

    const columns =
        [
            {
                Header: "עונה",
                accessor: "season",
            },
            {
                Header: "שם חלקה",
                accessor: "plotName",
                Cell: EditableCell
            },
            {
                Header: "זן",
                accessor: "fruitType",
                Cell: () => {
                    return (

                        <select value={copyPlot.fruitTypeID} onChange={(e) => handleFruitsListSet(e.target.value, fruitTypeLIsActiveList)}>
                             <option>בחר</option>
                            {fruitTypeLIsActiveList.map((option) => (
                                <option key={option.id} value={option.id}> {option.fruitType} | {option.fruitName}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "מספר דונמים",
                accessor: "dunam",
                Cell: EditableCell
            },
            {
                Header: "שנת שתילה",
                accessor: "plantYear",
                Cell: () => {
                    return (
                        
                        <select  value={copyPlot.plantYear} onChange={(e) => setCopyPlot({ ...copyPlot, plantYear: e.target.value })}>
                           {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                    </select> )
                }
            },
            {
                Header: "שנת הרכבה",
                accessor: "assamblyYear",
                Cell: () => {
                    return (
                        
                        <select  value={copyPlot.assamblyYear} onChange={(e) => setCopyPlot({ ...copyPlot, assamblyYear: e.target.value })}>
                           {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                    </select> )
                }
            },
            {
                Header: "בעל החלקה",
                accessor: "plotOwner",
                // width:300,
                // canAdd2List: "1",
                Cell: () => {
                    return (<select value={copyPlot.plotOwner} onChange={(e) => setCopyPlot({ ...copyPlot, plotOwner: e.target.value })}>
                        {plotOwnerList.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>)
                }
            },
            {
                Header: "פעיל?",
                accessor: "isActive",
                Cell: row => {

                    return (
                        <div >
                            <input type="checkbox"
                                className="checkbox_is_Active"
                                defaultChecked={row.value}
                                onBlur={(event) => updateMyData(row.column.id, event.target.checked)} />
                        </div>)
                }
            }
        ]


    let message = (
        <div>
            <ul>
                <li>לא ניתן להוסיף עונה+שם חלקה+ זן+ שנות שתילה/הרכבה הזהה לאחרת</li>
                <li> חובה למלא עונה, שם חלקה, זן, שנת שתילה </li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)

    return (

        <div>
            <GenericAddPage
                addObjDB={addPlot}
                updateMyData={updateMyData}
                toFilter={selected_season}
                columns={columns}
                data={copyPlot}
                setData={setCopyPlot}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )

}


export default AddPlot;