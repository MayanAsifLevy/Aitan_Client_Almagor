import React from 'react'
import './Popup_Style.css'


function Popup_Add(props) {

  return (props.trigger) ? (

    <div className="popup">

      <div className='popup-inner'>
        {props.children}
      </div>

    </div>
  ) : "";
}

export default Popup_Add