import React from 'react'
import './Popup_Style.css'
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

function Popup(props) {

  return (props.trigger) ? (

    <div className="popup">

      <div className='popup-inner'>

        <IconButton className='close-btn' onClick={() => props.setTrigger(false)}>
          <CloseIcon  />
        </IconButton>

        {props.children}

      </div>

    </div>
  ) : "";
}

export default Popup