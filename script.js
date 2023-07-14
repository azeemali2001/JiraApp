let addTag = document.querySelector('.add');
let addFlag = false; // false mean modal close

let modalTag = document.querySelector('.modal');

let colors = ["pink", "blue", "green", "black"];
let modalPriorityColor = colors[colors.length - 1];

let allColor = document.querySelectorAll('.Pcolor');

addTag.addEventListener('click', (e) => {
    if(addFlag) {
        modalTag.style.display = 'none';
    } else {
        modalTag.style.display = 'flex';
    }

    addFlag = !addFlag;
})


let removeTag = document.querySelector('.remove');
let removeFlag = false;  //false mean remove close

removeTag.addEventListener('click', (e) => {
    removeFlag = !removeFlag;
})



allColor.forEach((color) => {
    color.addEventListener('click', (e)=>{
        allColor.forEach((c)=> {
            c.classList.remove('border');
        })

        color.classList.add('border');

        modalPriorityColor = color.classList[1];
    })
})


let textareaTag = document.querySelector('.textarea');

modalTag.addEventListener('keydown', (e) => {
    let key = e.key;
    console.log(key);

    if(key == 'Shift') {
        createTask(textareaTag.value,modalPriorityColor);
        setModalToDefault();
    }
})

let mainArea = document.querySelector('.main-area');



function createTask(text,color,ticketID) {
    let id = ticketID || shortid();
    let ticketCont = document.createElement('div');

    ticketCont.setAttribute('class', 'ticket-cont');

    ticketCont.innerHTML = `
        <div class="priority-color ${color}"></div>
        <div class="key">${id}</div>
        <div class="task">${text}</div>
        <div class="lock">
            <i class="fas fa-lock"></i>
        </div>
    `;

    mainArea.appendChild(ticketCont);

    if(!ticketID) ticketArr.push({text, color, ticketID : id})

    removeHandler(ticketCont);
    lockHandler(ticketCont);
    colorHandler(ticketCont);
}

function removeHandler(ticketCon) {
    ticketCon.addEventListener('click', (e)=> {
        if(removeFlag === false) return;

        ticketCon.remove();
    })
}

let lock = "fa-lock";
let unlock = "fa-lock-open";

function lockHandler(ticket) {
    let lockTagEle = ticket.querySelector('.lock');
    let lockTag = lockTagEle.children[0];
    let taskarea = ticket.querySelector('.task');

    lockTag.addEventListener('click',(e)=> {
        if(lockTag.classList.contains(lock)) {
            lockTag.classList.remove(lock);
            lockTag.classList.add(unlock);
            taskarea.setAttribute('contenteditable','true');
        } else {
            lockTag.classList.remove(unlock);
            lockTag.classList.add(lock);
            taskarea.setAttribute('contenteditable','false');
        }
    })
}

function colorHandler(ticket) {
    let ticketColor = ticket.querySelector('.priority-color');
    ticketColor.addEventListener('click', (e)=> {
        let currcolor = ticketColor.classList[1];
        
        let colorIdx = colors.findIndex((color) => {
            return currcolor == color;
        })

        colorIdx++;
        let newColorIdx = colorIdx % colors.length;
        let newColor = colors[newColorIdx];

        ticketColor.classList.remove(currcolor);
        ticketColor.classList.add(newColor);

    })
}



function setModalToDefault() {
    addFlag = false;
    modalTag.style.display ='none';
    textareaTag.value = "";

    modalPriorityColor = colors[colors.length-1];
    allColor.forEach((color)=>{
        color.classList.remove('border');
    })

    allColor[allColor.length-1].classList.add('border');
}


let toolBoxColorCont = document.querySelectorAll('.color');

let ticketArr = [];

toolBoxColorCont.forEach((eachColor) => {
    eachColor.addEventListener('click', (e) => {
        let currToolBoxColor = eachColor.classList[1];
        console.log(currToolBoxColor)
        let filteredTicket = ticketArr.filter((ticketObj, idx) => {
            return currToolBoxColor === ticketObj.color
        })

        //remove previous ticket
        let allTicket = document.querySelectorAll('.ticket-cont');
        for(let i=0;i<allTicket.length;i++) {
            allTicket[i].remove();
        }

        for(let i=0;i<filteredTicket.length;i++) {
            createTask(filteredTicket[i].text, filteredTicket[i].color, filteredTicket[i].ticketID);
        }
    })

    eachColor.addEventListener('dblclick', (e) => {
        //remove previous ticket
        let allTicket = document.querySelectorAll('.ticket-cont');
        for(let i=0;i<allTicket.length;i++) {
            allTicket[i].remove();
        }

        ticketArr.forEach((ticketObj, idx) => {
            createTask(ticketObj.text, ticketObj.color, ticketObj.ticketID);
        })
    })
})