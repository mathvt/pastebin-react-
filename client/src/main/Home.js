import './home.css'
import React from 'react'
import Code from './components/codemirror'
import SelectLang from './components/select_language'
import SelectTime from './components/select_expiration'


function Home(props){
    const [time, setTime] = React.useState('never')
    const [syntax, setSyntax] = React.useState(null);
    const [mainTxt, setMainTxt] = React.useState('C');
    

    return(
        <div className='mainBody'>
        <p>New Paste</p>

        <div className='pasteBorder'>
            <Code syntax={syntax} setSyntax={setSyntax} setMainTxt={setMainTxt} />
        </div>
        
        <div className='hr'></div>

        <div id="flex-col">

            <div className="flex">
                <label className="labelCol">syntax :</label>
                <div className="info">
                    <SelectLang setSyntax={setSyntax} syntax={syntax} />
                </div>
                
            </div>
            <div className="flex">
                <label className="labelCol">expiration :</label>
                <div className="info">
                    <SelectTime setTime={setTime} time={time} className="info border" />
                </div>
            </div>
            <div className="flex">
                <label className="labelCol">name :</label>
                <div className="info">
                    <input type="text" id="name" name="name" className='border'></input> 
                </div>
                               
            </div>

        </div>

        <button onClick={sendRequest}>Save</button>
        </div>
        
    )




    async function sendRequest(){
        const info = getValue(mainTxt, syntax, time)
        const res = await fetch('/',{
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        console.log(res)
        if (res.status === 200){
            let hash = await res.text()
            if(hash === '0'){
                
                document.getElementById('main').placeholder = 'Please write here !!'
                return
            }
            window.location.href = '/' + hash
        }
    }
    function getValue(main, syntax, time){
        return {
            main: main.value,
            syntax: syntax,
            expiration: time,
            name: document.getElementById('name').value
        }
    }
}


export default Home








