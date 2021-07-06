import React from 'react';
import Home from './Home'
import ShowPaste from './ShowPaste'
import List from './List'


function Main(){
    const [path, setPath] = React.useState(window.location.pathname)

    if(path === '/'){
        return <Home setPath={setPath}/>
    }
    else if(path === '/list'){
        return <List setPath={setPath} path={path} />
    }
    else{
        return <ShowPaste setPath={setPath} path={path} />
    }
}

export default React.memo(Main)



