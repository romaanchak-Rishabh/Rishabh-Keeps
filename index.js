const addButton = document.querySelector('#add');

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');

    const notes = [];
    console.log(textAreaData);
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })
    console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes));
}

const delAll = document.querySelector('#del-all');

const addNewNote = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="operation">
        <button class="edit"><i class="far fa-edit" id="change"></i></button>
        <button class="delete"><i class="far fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>  `;

    note.insertAdjacentHTML("afterbegin", htmlData);

    const changeBtn = note.querySelector('#change')
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    // deleting the node
    delButton.addEventListener('click', () =>  {
        note.remove();
        updateLSData();    
    })

    // delete all nodes
    delAll.addEventListener('click', () => {
        note.remove();
        updateLSData();
})

    // toggle using edit button

    textarea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
        if(changeBtn.classList.contains('fa-edit')) {
            changeBtn.classList.remove('fa-edit');
            changeBtn.classList.add('fa-save');
        }else {
            changeBtn.classList.add('fa-edit');
            changeBtn.classList.remove('fa-save');
        }
    })

    textarea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
    })

    document.body.appendChild(note);
}

// getting data back from local storage

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes) { notes.forEach((note) => addNewNote(note) )  };

addButton.addEventListener('click', () => addNewNote() );
