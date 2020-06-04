document.addEventListener('DOMContentLoaded', (event) => {
    //console.log('DOM fully loaded and parsed')
const squares = document.querySelectorAll('.grid div')
const resultDisplay = document.querySelector('#Result')
let width = 15
let currentShooterIndex = 202
let currentVirusIndex = 0
let coronavirusTakeDown = []
let result = 0
let direction = 1
let invaderId

const coronaVirus = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39 
]

//draw alien invaders

coronaVirus.forEach(invader => squares[currentVirusIndex + invader].classList.add('invader'))


squares[currentShooterIndex].classList.add('shooter')

//move the shooter

function moveShooter(e){

    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.keyCode){

        case 37:
            if(currentShooterIndex % width !== 0) currentShooterIndex -=1
            break
        
        case 39:
            if(currentShooterIndex % width < width -1) currentShooterIndex +=1
            break

    } //end of switch
    squares[currentShooterIndex].classList.add('shooter')
}// end of function
document.addEventListener('keydown', moveShooter)

// move aliens

function moveInvaders(){

    const leftEdge = coronaVirus[0] % width === 0
    const rightEdge = coronaVirus[coronaVirus.length -1] % width === width -1

    if((leftEdge && direction === -1) || (rightEdge && direction ===1)){

        direction = width 
    }else if (direction === width){
        if(leftEdge) direction = 1
        else direction =-1
    }

    for (let i = 0;  i <= coronaVirus.length -1; i++){
        squares[coronaVirus[i]].classList.remove('invader')

    }

    for (let i = 0; i <= coronaVirus.length -1; i++){

        coronaVirus[i] += direction
    }

    for (let i = 0; i <= coronaVirus.length -1; i++){
        if(!coronavirusTakeDown.includes(i)){
            squares[coronaVirus[i]].classList.add('invader')
        }

        
    }

    //game over

    if(squares[currentShooterIndex].classList.contains('invader', 'shooter')){

        resultDisplay.textContent = 'Game Over'
        squares[currentShooterIndex].classList.add('boom')
        clearInterval(invaderId)
    }

    for (let i = 0; i <= coronaVirus.length -1; i++){
        if(coronaVirus[i] > (squares.length - (width -1))){
            resultDisplay.textContent = 'Game Over'
            clearInterval(invaderId)
        }

    }  

    // winner

    if(coronavirusTakeDown.length===coronaVirus.length){

        resultDisplay.textContent ='You Win'
        clearInterval(invaderId)
    }

} // end of function

invaderId = setInterval(moveInvaders, 500)


// shoot

function shoot(e){

    let laserId
    let currentlaserIndex = currentShooterIndex

    // move the laser

    function moveLaser() {

        squares[currentlaserIndex].classList.remove('laser')
        currentlaserIndex -= width
        squares[currentlaserIndex].classList.add('laser')
        if(squares[currentlaserIndex].classList.contains('invader')){

            squares[currentlaserIndex].classList.remove('laser')
            squares[currentlaserIndex].classList.remove('invader')
            squares[currentlaserIndex].classList.add('boom')

            setTimeout(() => squares[currentlaserIndex].classList.remove('boom'), 250)
            clearInterval(laserId)

            const alienTakeDown = coronaVirus.indexOf(currentlaserIndex)
            coronavirusTakeDown.push(alienTakeDown)
            result++
            resultDisplay.textContent = result
        }

            if(currentlaserIndex < width){
                clearInterval(laserId)
                setTimeout(() => squares[currentlaserIndex].classList.remove('laser'), 100)
            }

    }// end of function




   switch(e.keyCode){

    case 32: 
    laserId = setInterval(moveLaser, 100)
    break
   }

}

document.addEventListener('keyup', shoot)
});