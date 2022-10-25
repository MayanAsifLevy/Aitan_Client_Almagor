import React from 'react'
import './Popup_Style.css'


function PopupActions(props) {


  return (props.trigger) ? (

    <div className="popup popupAction">

      <div className='popup-inner'>

        {props.children}
        

      </div>

    </div>
  ) : "";
}

export default PopupActions