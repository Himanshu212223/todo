let addNote = document.getElementById('addNote');
addNote.addEventListener('click', function () {
    let topic = prompt("Enter Topic");
    let content = prompt("Enter Content");
    if (topic !== null && content !== null) {
        manageLocalStorage(topic, content);
    }
});

function manageLocalStorage(title, content){
    if(localStorage.todo === undefined){
        let todoArray = [] ;
        let todoList = {
            title: title,
            content: content
        }
        todoArray.push(todoList) ;
        stringValue = JSON.stringify(todoArray);
        localStorage.todo = stringValue ;
    }
    else{
        let todoArray = JSON.parse(localStorage.todo);
        let todoList = {
            title: title,
            content: content
        }
        todoArray.push(todoList) ;
        stringValue = JSON.stringify(todoArray);
        localStorage.todo = stringValue ;
    }
    showNoteTiles();
    location.reload();
}

function showNoteTiles(){
    let todoArray = JSON.parse(localStorage.todo) ;
    if(todoArray !== undefined){
        todoArray = Array.from(todoArray) ;
        todoArray.forEach(element => {
            // console.log(element.title) ;
            let body = `
            <h2>${element.title}</h2>
            <div class="content">
            <p>${element.content}</p>
            </div>
            <i class="fa-solid fa-trash delete"></i>
            ` ;
            let div = document.createElement('div');
            div.classList.add('notes');
            div.classList.add('added-notes');
        div.innerHTML = body;
        document.getElementById('main').appendChild(div);
    });
}
}


showNoteTiles();


let main = document.getElementById('main').getElementsByClassName('added-notes') ;
console.log(main);
main = Array.from(main) ;
main.forEach(note => {
    // console.log(note.children[0])
    note.getElementsByClassName('delete')[0].addEventListener('click', function(){
        let todoArray = JSON.parse(localStorage.todo) ;
        let newTodoArray = [] ;
        todoArray.forEach(currentNote => {
            if(currentNote.title !== note.children[0].innerText){
                newTodoArray.push(currentNote) ;
            }
        })
        localStorage.todo = JSON.stringify(newTodoArray);
        location.reload();
    })

})