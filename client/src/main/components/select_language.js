import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'



export default function SelectLang(props){
  const language = ['Bash', 'C', 'C#',' C++', 'CSS', 'Haskell', 'HTML', 'JSON', 'Java', 'JavaScript', 'Julia', 'Kotlin', 'Lua', 'Markdown', 'Objective C', 'OCaml', 'Pascal', 'PHP', 'Perl', 'Python', 'R', 'Ruby', 'Rust', 'SQL', 'Swift', 'TypeScript', 'VB.NET', 'XML', 'YAML']

  return(
    <Autocomplete
      options={language}
      value={props.syntax}
      style={{ width : 200, height : 40 }}
      size={'small'}
      onChange={(event, newValue) => {
        props.setSyntax(newValue)
      }}
      renderInput={(params) => <TextField {...params} variant="outlined" />}
    />     
  )
 
}


