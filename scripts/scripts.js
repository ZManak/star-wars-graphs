let years = [];
let titulos = [];
let nombrePersonajes = [];
let numPelis = [];

async function sacarDatos() {
    let response = await fetch('https://swapi.dev/api/films/');
    let pelis = await response.json();
    return pelis;
}

//La función que saca los datos es la misma que dibuja la gráfica
sacarDatos()
    .then(pelis => {
        for (pelicula of pelis.results) {
            titulos.push(pelicula.title);
            years.push(parseInt(pelicula.release_date.slice(0, 4)));
        }
        let data = {
            labels: titulos,
            series: [
                years
            ]
        };

        Chartist.Line('#ct-chart1', data, options);
    });



async function sacarDatos2() {
    let response = await fetch('https://swapi.dev/api/people/');
    let personajes = await response.json();
    return personajes;
}

//La función que saca los datos es la misma que dibuja la gráfica
sacarDatos2()
    .then(personajes => {
        for (personaje of personajes.results) {
            nombrePersonajes.push(personaje.name);
            numPelis.push(parseInt(personaje.films.length));
        }
        let data = {
            labels: nombrePersonajes,
            series: [
                numPelis
            ]
        };

        Chartist.Bar('#ct-chart2', data, options2);
    });


// Our labels and three data series


// We are setting a few options for our chart and override the defaults
let options = {
    // Don't draw the line chart points
    showPoint: true,
    // Disable line smoothing
    lineSmooth: false,
    // X-Axis specific configuration
    axisX: {
        // We can disable the grid for this axis
        showGrid: false,
        // and also don't show the label
        showLabel: true
    },
    // Y-Axis specific configuration
    axisY: {
        // Lets offset the chart a bit from the labels
        stepSize: 5,
        low: 1975,
        high: 2005,
        // The label interpolation function enables you to modify the values
        // used for the labels on each axis. Here we are converting the
        // values into million pound.
        labelInterpolationFnc: function (value) {
            return Math.round(value);
        }
    },
    height: 500
};
let options2 = {
    seriesBarDistance: 3,
    height: 500,
    axisX: {
        // We can disable the grid for this axis
        showGrid: false,
        // and also don't show the label
        showLabel: true
    },

  };