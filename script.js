const container = document.querySelector('.container')

const slider = document.querySelector('.slider')
const clearButton = document.querySelector('.clear')

const colorButtons = document.querySelectorAll('.color')
const buttonHeight = getComputedStyle(colorButtons.item(0))['height']
let chosenColor = 'rgb(0, 0, 0)'  // Default value as black for an additive color system

// Rows and squares for the canvas
let rows = []
let squares = []

// Mouse hover colors a canvas square
function hoverHighlight(square) {
    square.addEventListener('mouseover', (event) => {
        square.classList.add('highlight')

        // Add to opacity
        let currentOpacity = parseFloat(getComputedStyle(event.target)['opacity'])
        currentOpacity += 0.2
        event.target.style.setProperty('--highlight-opacity', currentOpacity)

        // Mix colors
        let currentColor = getComputedStyle(event.target)['background-color']
        let currentColorValues = currentColor.match(/\d+/g)  // Parses the rgb string for (d)igits (g)lobally
        let [r, g, b] = currentColorValues.map(Number)  // Turn to numbers

        let chosenColorValues = chosenColor.match(/\d+/g)
        let [cr, cg, cb] = chosenColorValues.map(Number)
        let colorMix = `rgb(${r + 0.2 * cr}, ${g + 0.2 * cg}, ${b + 0.2 * cb})`
        event.target.style.setProperty('--highlight-color', colorMix)
    })
}

function createCanvas(dimensions = 16) {
    for (let i = 0; i < dimensions; i++) {
        const row = document.createElement('div')
        container.appendChild(row)
        rows.push(row)
        for (let i = 0; i < dimensions; i++) {
            const square = document.createElement('div')
            row.appendChild(square)
            hoverHighlight(square)
            squares.push(square)
        }
    }
}

createCanvas()  // Create the first 16x16 canvas

function clearCanvas() {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
    rows = rows.slice(0, 0)  // Empty the rows array to alert the correct canvas size
}

// Custom canvas dimensions
slider.addEventListener('click', (event) => {
    let reso = rows.length
    reso = event.target.value
    if (reso === null) return  // Escape if user cancels the prompt
    
    // Make sure proper input is given
    while (isNaN(reso) || reso < 1 || reso > 100) {
        reso = prompt('Unsuitable input given, try again.', '1-100')
        if (reso === null) return
    }

    clearCanvas()
    createCanvas(reso)
})

clearButton.addEventListener('click', () => {
    let reso = rows.length
    clearCanvas()
    createCanvas(reso)
})

// Change color
colorButtons.forEach( btn => {
    btn.style.setProperty('--button-width', buttonHeight)
    btn.addEventListener('click', () => {
        chosenColor = getComputedStyle(btn)['background-color']
        slider.style.setProperty('--active-color', chosenColor)
    })
})