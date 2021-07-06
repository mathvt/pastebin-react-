import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/python/python.js'

function Code(props){

  return(
    <CodeMirror
      value={props?.content}
      options={{
        mode: changeMode(props.syntax),
        readOnly: props.content ? 'nocursor' : false
      }}
      onChange={(editor, data, value) => {
        props?.setMainTxt({ value });
        console.log(value)
      }}
    />
  )
}



export default Code



function changeMode(syntax){
  switch(syntax){
    case 'C':
      return 'text/x-csrc'
    case 'Java':
        return 'text/x-java'
    case 'JavaScript':
        return 'text/javascript'
    case 'Python':
        return 'text/x-python' 
    default:
      return syntax
   }
}