const columnContainer = document.getElementById('columnContainer');
const addCol = document.getElementById('addColButton');
const deleteButton = document.querySelectorAll('.delButton');
const lockButton = document.querySelectorAll('.lockButton');
let columns = document.querySelectorAll('.colorColumn')

let lockValues = [0, 0, 0]  //defines whether columns are locked

//adding columns

addCol.addEventListener('click', function(e){           
    console.log('addColumn');
    if (e.detail != 0) {                                //ensures hitting the space key doesn't trigger active element
 
        let newDiv = document.createElement('div');                    
        newDiv.classList.add('colorColumn');                

        let newPara = document.createElement('p')
        newPara.textContent = colorList.pop();
        newPara.classList.add('values')

        let newLock = document.createElement('button');                
        newLock.innerText = 'LOCK' 
        newLock.classList.add('lockButton');

        let newDel = document.createElement('button');                 
        newDel.innerText = 'DELETE'
        newDel.classList.add('delButton')

        columnContainer.appendChild(newDiv);                           
        newDiv.append(newPara, newDel, newLock)     

        newDiv.style.backgroundColor = randColor();
        columns = document.querySelectorAll('.colorColumn') 

        lockValues.push(0)

        newDiv.children[2].addEventListener('mousedown', function(){                           
            
            let divPosition = Array.prototype.indexOf.call(newDiv.parentElement.children, newDiv);   
            
            lockValues[divPosition] ++
            if(lockValues[divPosition] %2 == 1 || lockValues[divPosition] === 0){   
                newDiv.children[2].style.backgroundColor = 'red' 
            } else {
                newDiv.children[2].style.backgroundColor = 'white' 
            };
        })
    };
});

//Deleting columns

document.addEventListener('mousedown',function(evt){       
    if(evt.target.className == 'delButton'){                                    
        let button = evt.target;   
        let colInd = Array.prototype.indexOf.call(columnContainer.children, button.parentNode);  //gives us the index of the removed element from the column container       
        lockValues.splice(colInd, 1);   
        colorList.splice(colInd, 1);   
        button.parentNode.remove();        
        columns = document.querySelectorAll('.colorColumn')     
    };
});

//generating a random colour value for R, G and B and randomising colours on spacebar click

function randColor(){                                
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b}) `
}

let colorList = [randColor(), randColor(), randColor()]

document.addEventListener('keypress', function(e){                     
    if(e.key == ' '){                                                
        for(i = 0; i < columns.length; i++){
            if(lockValues[i] %2 !== 1){                                  //if the column is unlocked
                colorList[i] = randColor();                              //generate a new colour for it, store it in an array
                updateDisp();
            };
        };     
    };
});
 
// Lock button activation


for(let i = 0; i < columns.length; i++){
    columns[i].children[2].addEventListener('mousedown', function(){       //add listener to each lock button                                     
        lockValues[i] ++
        if(lockValues[i] %2 == 1 || lockValues[i] === 0){                                       //if the buttons lock value is true or "odd"
            columns[i].children[2].style.backgroundColor = 'red' 
        } else {
            columns[i].children[2].style.backgroundColor = 'white' 
        };
    });
}


//update the display

function updateDisp(){                                                           //update the colour display
    for(let i = 0; i < columns.length; i++){
        if(lockValues[i] %2 !== 1){                                              //if the colour is locked, don't update the display
            columns[i].children[0].textContent = colorList[i]
            columns[i].style.backgroundColor = colorList[i]                          //adds initial background colours
        }
    };
};

updateDisp()                                                                     //call so the initial colour display matches the generated colours