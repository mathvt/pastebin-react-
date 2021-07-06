
let syntax = document.getElementById('syntax')
let textArea = document.getElementById('main')

let myCode = CodeMirror.fromTextArea(textArea,{mode:'text/x-csrc'});

syntax.addEventListener('change', () => {
    let language
    switch(syntax.value){
        case 'C':
            language = 'text/x-csrc'
            break 
        case 'Java':
            language = 'text/x-java'
            break 
        case 'Javascript':
            language = 'text/javascript'
            break 
        case 'Python':
            language = 'text/x-python' 
       }
       return myCode.setOption("mode", language);
})

myCode.on('change', myCode.save)