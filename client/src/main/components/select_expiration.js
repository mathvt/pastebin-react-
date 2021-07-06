import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'



export default function SelectTime(props){
  const list = ['never', '5 minutes', '1 hour', '1 day', '1 month', '1 year']
  
  return(
    <Autocomplete
      options={list}
      value={props.time}
      style={{ width : 200, height : 40 }}
      size={'small'}
      onChange={(event, newValue) => {
        props.setTime(newValue)
      }}
      renderInput={(params) => <TextField {...params} variant="outlined" />}
    />     
  )
 
}