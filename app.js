const createButton = document.querySelector("[data-create-button]")
const newNote = document.querySelector("[data-new-note-class]")
const checkIcon = document.querySelector("[data-check-icon]")
const crossIcon = document.querySelector("[data-cross-icon]")
const newNotescontainer = document.querySelector("[data-new-notes-container]")
const newNoteText = document.getElementById("new-note-text")
const newNotes = document.querySelector(".new-note")

const SAVE_NOTE_TEXT_VALUE = "task-notes-text"

let savedNote =JSON.parse(localStorage.getItem(SAVE_NOTE_TEXT_VALUE)) || []
var selectedlistId

window.addEventListener('load',()=>{
    render()
})

createButton.addEventListener('click',()=>{
   newNote.style.display='flex'
})


checkIcon.addEventListener('click',()=>{
    var textinput = newNoteText.value
    const list = createNote(textinput)
    savedNote.push(list)
    newNoteText.value=null
    save()
    renderNotes()
})

crossIcon.addEventListener('click',()=>{
    newNoteText.value =null
    newNote.style.display=''
})

function createNote(text){
  return {id: Date.now().toString(), text: text}
}

function saveAndRender(){
    save()
    render()
}

function save(){
    localStorage.setItem(SAVE_NOTE_TEXT_VALUE, JSON.stringify(savedNote))
}

function render(){
    savedNote.forEach(list =>{
        const notesElement=document.createElement('textarea')
        notesElement.dataset.listId = list.id
        notesElement.classList=("note-text new-note")
        notesElement.value= list.text
        notesElement.style.background = randombackground()
        newNotescontainer.appendChild(notesElement)
    })
}

newNotescontainer.addEventListener('click',e=>{
    if(e.target.tagName.toLowerCase()==='textarea'){
        selectedlistId=e.target.dataset.listId
    }
})

newNotescontainer.addEventListener('dblclick',e=>{
    if(e.target.tagName.toLowerCase()==='textarea'){
        savedNote=savedNote.filter(list => list.id !== selectedlistId)
        save()
        renderNotes()
    }
})

newNotescontainer.addEventListener('click',e=>{
    if(e.target.tagName.toLowerCase()==='textarea'){
        e.target.addEventListener('change',()=>{
            for(i=0 ; i<savedNote.length ;i++)
            {
                if(savedNote[i].id === selectedlistId)
                {
                    savedNote[i].text = e.target.value
                }
            }
            save()
            renderNotes()
        })
    }
})



function renderNotes(){
    clearElement(newNotescontainer)
    render()
}

function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}

function randombackground(){
    let bgColor = ['#FACDC6','#A7DBD3','#D3D4E8','#F1CF30','#D1D1D1','#f1bdff','#c5ffbd','#c9fffe','#ffc9ef','#ffcccf']
    var random = Math.floor(Math.random()*10)
    return bgColor[random]
}

