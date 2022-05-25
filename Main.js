const columnContainer = document.getElementById('columnContainer');
const addCol = document.getElementById('addColButton');
const deleteButton = document.querySelectorAll('.delButton');
const lockButton = document.querySelectorAll('.lockButton');
let columns = document.querySelectorAll('.colorColumn')

let lockValues = [0, 0, 0]      //defining the current columns as unlocked;

//adding columns

addCol.addEventListener('click', function(e){           
    console.log('addColumn');
    if (e.detail != 0) {                                               //reset the click count, so that space won't trigger the add button
 
        let newDiv = document.createElement('div');                    

        let newPara = document.createElement('p')
        newPara.textContent = colorList.pop();

        let newLock = document.createElement('button');                
        newLock.innerText = 'LOCK' 

        let newDel = document.createElement('button');                 
        newDel.innerText = 'DELETE'

        columnContainer.appendChild(newDiv);                           
        newDiv.append(newPara, newDel, newLock)     

        newDiv.classList.add('colorColumn');                
        newPara.classList.add('values')
        newLock.classList.add('lockButton');
        newDel.classList.add('delButton')
    
        newDiv.style.backgroundColor = randColor();
        columns = document.querySelectorAll('.colorColumn')       //make sure all new columns are indexed

        lockValues.push(0)                                    //add a new object to the lock values array

        newDiv.children[2].addEventListener('mousedown', function(){       //add listener to each lock button - could do with being refactored to DRY up code, is it possible to fit all of 5his into a function with args?                                  
            
            let divPosition = Array.prototype.indexOf.call(newDiv.parentElement.children, newDiv);   //to get the index of each new div created, and addEventListener to that specific Div
            
            lockValues[divPosition] ++
            if(lockValues[divPosition] %2 == 1 || lockValues[divPosition] === 0){                                       //if the buttons lock value is true or "odd"
                newDiv.children[2].style.backgroundColor = 'red' 
                console.log(lockValues[divPosition])
                return true 
            } else {
                newDiv.children[2].style.backgroundColor = 'white' 
                console.log(lockValues[divPosition])
                return false
            };
        })
    };
});

//Deleting columns

document.addEventListener('mousedown',function(evt){       
    if(evt.target.className == 'delButton'){                                    
        let button = evt.target;   
        let colInd = Array.prototype.indexOf.call(columnContainer.children, button.parentNode);  //gives us the index of the removed element from the colum container
        console.log(colInd);         
        lockValues.splice(colInd, 1);   //removes this column from lockValues
        colorList.splice(colInd, 1);    //removes colour from colorList index
        button.parentNode.remove();        //removes the parent of the delete button
        columns = document.querySelectorAll('.colorColumn')       //updates the DOM to ensure removed columns are recognised as not present
    };
});

//generating a random colour value for R, G and B//

function randColor(){                                
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b}) `
}

let colorList = [randColor(), randColor(), randColor()]       //sets an initial random colour for the columns, applys effect when updateDisp is called

//randomising colours on spacebar

document.addEventListener('keypress', function(e){                       //on a keypress, the key that was pressed get passed in
    if(e.key == ' '){                                                    //if the passed key is "space"
        for(i = 0; i < columns.length; i++){
            if(lockValues[i] %2 !== 1){                                  //if the column is unlocked
                colorList[i] = randColor();                              //generates new colour values for the columns, stores them in an array
                updateDisp();
            };
        };     
    };
});
 
// Lock button activation

function getNode(){
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
}
getNode()                                                                        //call so it works with original buttons

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