$(function () {
    const $form = $("form[name='impactor']")
    $form.on('submit', function (evt) {
        evt.preventDefault()
        const data = Array.from($($form).serializeArray()).reduce(
            (obj, { name, value }) => {
                obj[name] = Number(value)
                return obj
            },
            {}
        )
        console.log(data)

        // Do the math here
        var inputDens = data.density ? data.density : data.density_list
        var isBurned = 15000 / inputDens

        var energyJ =
            (Math.PI / 12) *
            (inputDens *
                Math.pow(data.diameter, 3) *
                Math.pow(data.impact_velocity * 1000, 2))
        var energyKT = (energyJ / (4.18 * Math.pow(10, 12))).toFixed(2)
        var intervalYear = 109 * Math.pow(+energyKT / 1000, 0.78)
        var intervalDay = 0
        if (intervalYear < 1) {
            intervalDay = (intervalYear * 365).toFixed(2)
        }
        var resultText = `The Impact Energy will be:<b> ${energyJ} Joules = ${energyKT} KiloTons TNT</b>`
        var text1 = `The average interval between impacts of this size somewhere on Earth is <b>${
            intervalDay ? intervalDay : intervalYear
        } ${intervalDay ? 'days' : 'years'}</b>`
        var com1 = `It should be similar like <b>Chelyabinsk Event</b>, which impact energy was around 440KT. The shock wave that smashed windows as far as 125 miles from the point of impact, damaged more than 300 buildings and injured over 1,200 people.`
        var com2 = `It should be similar like <b>Tunguska Event</b>, which impact energy was around 10-15 MT. The air bust flattened approximately 80 million trees in over a 2,150 km^2 area and the dust particles from the explosion suspended in the atmosphere for months.`
        var explainText =
            'The meteor will be totally burned up before hitting the ground'
        if (data.diameter > isBurned) {
            if (energyKT / 1000 < 1) {
                explainText = com1
            } else if (5 < energyKT / 1000 < 15) {
                explainText = com2
            }
        }

        $('.main').html(`<h2>Impactor Parameters from User Inputs:</h2>
            <ul>
                <li>Impactor diameter: <b>${data.diameter} meters</b></li>
                <li>Impactor density: <b>${
                    data.density ? data.density : data.density_list
                } kg/m^3</b></li>
                <li>Impactor velocity: <b>${data.impact_velocity} km/s</b></li>
                <li>Impactor diameter: <b>${data.impact_angle} degrees</b></li>
            </ul>
            <h2>Impact Energy:</h2>
            <p class="result-text">${resultText}<br>${text1}<br>${explainText}</p>`)
    })

    $('h1').click(function () {
        location.reload(true)
    })
})
