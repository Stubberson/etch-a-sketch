const container = document.querySelector('.container')

function hoverHighlight(square) {
    square.addEventListener('mouseover', (event) => {
        event.target.classList.add('highlight')
    })
}

function createGrid(dimensions = 16) {
    for (let i = 0; i < dimensions; i++) {
        const row = document.createElement('div')
        container.appendChild(row)
        for (let i = 0; i < dimensions; i++) {
            const square = document.createElement('div')
            row.appendChild(square)
            hoverHighlight(square)
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
        dims = prompt('Unsuitable input given. Try again.', '1-100')
        if (dims === null) return
    }

    // Remove the original grid
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }

    createGrid(dims)
})