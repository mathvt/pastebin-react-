import { useEffect } from 'react';
import React from 'react'
import './showPaste.css'
import Code from './components/codemirror'



function ShowPaste(props){
    const [data, setData] = React.useState(null);
    
    useEffect(() =>{
        fetch(window.location)
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((res) => setData(undefined))
    },[props.path])

    function copy(){
        navigator.clipboard.writeText(data.content)
    }


    document.title = data?.name || 'Untitled Paste'


    if(data){
        return (
            <div className='mainBody'>
                <p>{data?.time}</p>
                <div className='hr'></div>
                <Code syntax={data?.syntax} content={data?.content} />
                <div className='hr'></div>
                <button className="copy" onClick={copy} >Copy text</button>
            </div>
            
        )
    }
    else if(typeof data === 'undefined'){
        return(<h2 className='mainBody'>Not found</h2>)
    }
    else{
        return(<h2 className='mainBody'>Loading...</h2>)
    }

    
}


export default ShowPaste