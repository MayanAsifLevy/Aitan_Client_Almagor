import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './loginStyle.css'
import logo from '../mainPage/logo.GIF'
import Popup from '../general_comp/popUps/Popup';
import { useDispatch } from "react-redux";
import { VscDebugStart } from 'react-icons/vsc'
import * as LoginUtils from "../../utils/LoginUtils"
import { saveToken, saveLoginUser } from '../../redux/login/user_actions';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [popUp, setPopUp] = useState(false)
    const [message, setMessage] = useState('')

    const userinputRef = useRef();
    const passwordinputRef = useRef();

    const SubmitLogin = async (e) => {
        e.preventDefault();

        const enteredUser = userinputRef.current.value;
        const EnteredPswd = passwordinputRef.current.value;


        //check that the user& password Token is correct
        let credentials = { "userName": enteredUser, "password": EnteredPswd };

        let ToeknData = await LoginUtils.Post_Credentials(credentials)


        if (ToeknData === -1) {
            dispatch(saveToken(-1))
        }
        else {
            dispatch(saveToken(ToeknData))
        }


        if (ToeknData !== -1) {
            const data = await LoginUtils.Enter_Login(ToeknData["token"]);

            if (data === "you are not authorized") {
                setMessage("אינך מורשה להכנס לאתר")
                setPopUp(true)
                navigate("/")
            }

            else {
                dispatch(saveLoginUser(data))
                navigate("/seasonSelect")
            }
        }
        else {
            setMessage("שם משתמש ו/או סיסמא לא מוכרים. אנא נסו שוב")
            setPopUp(true)
            navigate("/")
        }
    }


    return (
        <div >
            <p className='title'>בית אריזה "איתן"</p>

            <br /><br /><br /><br />

            <form className="login_container" onSubmit={SubmitLogin} >
                <div className='login_container_data'>

                    <div className="reportsFilters">

                        <div className="filtersName">
                            <label style={{ fontWeight: 'bold' }}>משתמש:</label>
                            <br /> <br />
                            <label style={{ fontWeight: 'bold' }}>סיסמא:</label>
                            <br />
                        </div>
                        <div className="filtersInput">

                            <div>
                                <input type="text" id="usename" ref={userinputRef} />
                            </div>
                            <br />
                            <div >
                                <input type="password" id="pswd" ref={passwordinputRef} />
                            </div>
                        </div>

                    </div >


                    <button type="submit"><VscDebugStart style={{ transform: 'rotate(180deg)', width: '5rem' }} /></button>

                </div>

            </form>

            <div>
                <img src={logo} className='logo' alt="My logo" />
            </div>


            <Popup trigger={popUp} setTrigger={setPopUp}>
                <div className='popupMessage'> {message} </div>
            </Popup>

        </div>
    )
}


export default Login