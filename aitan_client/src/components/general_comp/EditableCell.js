import React, { useEffect } from "react"


const EditableCell = ({
  value: initialValue,
  column: { id }, // it is the column's id - the location
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {


  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)
  
  const onChange = e => {
    setValue(e.target.value )
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input  className= "editInput" value={value} onChange={onChange} onBlur={onBlur}/>
}
export default EditableCell

