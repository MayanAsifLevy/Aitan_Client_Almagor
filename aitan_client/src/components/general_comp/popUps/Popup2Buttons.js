import React from 'react'
import './Popup_Style.css'


function Popup2Buttons(props) {

  const cont2Action = () => {
    props.contAction()
  }

  const contCancel = () => {
    props.contCancel()
  }


  return (props.trigger) ? (

    <div className="popup popupAction">

      <div className='popup-inner'>

        {props.children}
        <div className='bottomButtons'>
          <button className='buttons' onClick={cont2Action}> {props.actionName} </button>
          <button className='buttons' onClick={contCancel}> בטל </button>
        </div>

      </div>

    </div>
  ) : "";
}

export default Popup2Buttons