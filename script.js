const container = document.querySelector('.container')

function hoverHighlight(square) {
    square.addEventListener('mouseover', (event) => {
        event.target.classList.add('highlight')
    })
}

// Create a 16x16 grid
for (let i = 0; i < 16; i++) {
    const row = document.createElement('div')
    container.appendChild(row)
    for (let i = 0; i < 16; i++) {
        const square = document.createElement('div')
        row.appendChild(square)
        hoverHighlight(square)
    }
}
