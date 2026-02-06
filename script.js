const container = document.querySelector('.container')

// Custom grid button
const button = document.querySelector('button')
button.focus()

// Color buttons
const colorButtons = document.querySelectorAll('.color')
const buttonHeight = getComputedStyle(colorButtons.item(0))['height']
let chosenColor = null

// Hover colors a grid square
function hoverHighlight(square) {
    square.addEventListener('mouseover', (event) => {
        event.target.classList.add('highlight')

        // Add to opacity
        let currentOpacity = parseFloat(getComputedStyle(event.target)['opacity'])
        currentOpacity += 0.1
        event.target.style.setProperty('--highlight-opacity', currentOpacity)

        // Mix colors
        let currentColor = getComputedStyle(event.target)['background-color']
        let currentColorValues = currentColor.match(/\d+/g)  // Parses the rgb string for (d)igits (g)lobally
        let [r, g, b] = currentColorValues.map(Number)  // Turn to numbers
        
        // No need to mix if no color is changed
        if (chosenColor !== null) {
            let chosenColorValues = chosenColor.match(/\d+/g)
            let [cr, cg, cb] = chosenColorValues.map(Number)
            let combination = `rgb(${0.1 * cr + r}, ${0.1 * cg + g}, ${0.1 * cb + b})`
            event.target.style.setProperty('--highlight-color', combination)
        }
    })
}

let squares = []  // Allows to modify each square
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

// Custom grid dimensions
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

// Change color
colorButtons.forEach( btn => {
    btn.style.setProperty('--button-width', buttonHeight)  // First set height
    btn.addEventListener('click', () => {
        chosenColor = getComputedStyle(btn)['background-color']
        squares.forEach( sqr => {
            // Don't change the highlight color for already colored squares
            if (!sqr.classList.contains('highlight')) {
                sqr.style.setProperty('--highlight-color', chosenColor)
            }
        })
    })
})