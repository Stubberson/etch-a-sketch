const container = document.querySelector('.container')

// Hover highlights a grid square
function hoverHighlight(square) {
    square.addEventListener('mouseover', (event) => {
        event.target.classList.add('highlight')

        // Add to opacity
        let currentOpacity = parseFloat(getComputedStyle(event.target).opacity)
        currentOpacity += 0.1
        event.target.style.setProperty('--highlight-opacity', currentOpacity)
    })
}

let squares = []  // Container for all the square in the grid
function createGrid(dimensions = 16) {
    for (let i = 0; i < dimensions; i++) {
        const row = document.createElement('div')
        container.appendChild(row)
        for (let i = 0; i < dimensions; i++) {
            const square = document.createElement('div')
            row.appendChild(square)
            hoverHighlight(square)
            squares.push(square)
        }
    }
}

// Create the first 16x16 grid
createGrid()

// Define custom grid dimensions
const button = document.querySelector('button')
button.focus()
button.addEventListener('click', () => {
    let dims = prompt('How many rows would you like in the square grid?', '1-100')
    if (dims === null) return  // Escape if user cancels the prompt
    
    // Make sure proper input is given
    while (isNaN(dims) || dims < 1 || dims > 100) {
        dims = prompt('Unsuitable input given, try again.', '1-100')
        if (dims === null) return
    }

    // Remove the original grid
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }

    createGrid(dims)
})

// Square color buttons
const colorButtons = document.querySelectorAll('.color')
const buttonHeight = getComputedStyle(colorButtons.item(0)).height

colorButtons.forEach( btn => {
    btn.style.setProperty('--button-width', buttonHeight)
    // Change the color for the etch
    btn.addEventListener('click', () => {
        squares.forEach( sqr => {
            // Don't change the color for the already colored squares
            if (!sqr.classList.contains('highlight')) {
                sqr.style.setProperty('--highlight-color', getComputedStyle(btn).backgroundColor)
            }
        })
    })
})