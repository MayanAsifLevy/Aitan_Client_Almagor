import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './loginStyle.css'
import logo from '../mainPage/logoInPages.GIF'
import { useDispatch } from "react-redux";
import { saveSeason } from '../../redux/mainPage/general_actions';
import { IoEnterSharp } from 'react-icons/io5'

const SeasonSelect = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // get the list of years from this year and on  
    const year = (new Date()).getFullYear();
    const minYear = 2017;
    const [value, setValue] = useState(year)
    const years = Array.from(new Array(20), (val, index) => index + minYear);

    useEffect(() => {
        dispatch(saveSeason(parseInt(year)))
    }, [])


    const selectHandler = (e) => {
        setValue(parseInt(e.target.value))
        dispatch(saveSeason(parseInt(e.target.value)))
    }


    const SubmitSeason = async (e) => {
        e.preventDefault();
        navigate("/mainPage")
    }


    return (
        <div >
            {/* <p className='title'>בית אריזה "איתן"</p> */}

            <div className="div_imp_season" >
                <img src={logo} className="logo" alt="aitanLogo" />
            </div>


            <br /><br /><br /><br />

            <div className='pickSeason'>
                עונה:
                {
                    <select className='dropList' value={value} onChange={selectHandler}>

                        {

                            years.map((year, index) => {
                                return <option data-testid="option" className='dropItem' key={`year${index}`} value={year}>{year}</option>
                            })
                        }
                    </select>
                }
                <IoEnterSharp size={85} style={{ transform: 'rotate(180deg)' }} onClick={SubmitSeason} />
            </div>

        </div>
    )
}


export default SeasonSelect