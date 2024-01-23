const mode = document.getElementById("mode")
const getColor = document.getElementById("get-color")
const colorOutput = document.getElementById("color-output")
const colorInput = document.getElementById("color-picker")
let modeOptions = [
    "Monochrome",
    "Monochrome-dark",
    "Monochrome-light",
    "Analogic",
    "Complement",
    "Analogic-complement",
    "Triad"]
const renderModeOptions = () => {
    modeOptions.forEach((option) => {
        mode.innerHTML += `<option value="${(option).toLowerCase()}">${option}</option>`
    })
}
const output = (mode, color) => {
    fetch(`https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=5`)
        .then(res => res.json())
        .then(data => {
            renderColors(data)
            renderColorName(data)
        })
}
getColor.addEventListener("click", () => {
    colorOutput.innerHTML = ''
    output(mode.value, (colorInput.value).slice(1))
})
const renderColors = (data) => {
    (data.colors).forEach((color, index) => {
        renderOutputGrids(color.hex.value, index)
    })
}
const renderColorName = (data) => {
    (data.colors).forEach((color) => {
        renderNames(color.hex.value)
    })
}
const renderOutputGrids = (color, index) => {
    colorOutput.innerHTML += `<div id="color-grids-${index}"></div>`
    document.getElementById(`color-grids-${index}`).style.background = color
}
const renderNames = (color) => {
    colorOutput.innerHTML += `<p>${color}</p>`
}
renderModeOptions()