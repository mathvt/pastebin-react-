import React, { useEffect } from "react";
import './list.css'

function List(props){
    const [pasteList, setPasteList] = React.useState(null);

    useEffect(() =>{
        fetch('list',{
            method: 'PATCH',
            })
        .then((res) => res.json())
        .then((res) => setPasteList(res))
    },[props.path])


    document.title = 'list'

    return(
        <div className="mainBody flex-col" id="pastesList">
            {console.log(pasteList)}
            {!pasteList ? <p>Loading</p> : 
            pasteList === [] ? <p>Empty</p> :
            pasteList.map(e => {
                return(
                    <div onClick={() => window.open('/'+e.hash, "_blank")} className="listElemt" key={e.hash}>
                        <p className="li">{e.name}</p>
                        <p className="li">{e.syntax}</p>
                        <p className="li">{e.time}</p>
                    </div>
                )})
            }
        </div>
    )
}

export default List