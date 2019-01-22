const dataButton = document.getElementById('get_data')
let currentQuery = 'comet'
let min, max
let totalHits = []
let show
let rnd

dataButton.addEventListener('click', getData)

function generateRndNumber (min, max) {
    rnd = Math.floor(Math.random() * (max - min) + min)
    return rnd  
}

async function getData() {
    //get data from nasa image api
    const res = await fetch(`https://images-api.nasa.gov/search?q=${currentQuery}`)
    const data = await res.json()
    //static max sent per request. Modify to actual total_hits param
    if(!data.collection.links) {
        max = data.collection.metadata.total_hits
    } else {
        for (i = 1; i < data.collection.metadata.total_hits/100; i++){
            totalHits = data.collection.items
            nextPage = await fetch(`https://images-api.nasa.gov/search?q=${currentQuery}`)
        }
    }
    const max = 99

    //generate random number as to select which description + image combo to show
    generateRndNumber(0, max)

    //insert description into DOM
    document.getElementById('text_output').innerHTML = data.collection.items[rnd].data[0].description

    //get nasa_id param to use on image URL
    let imgLink = data.collection.items[rnd].data[0].nasa_id
    document.getElementById('img_output').src = `http://images-assets.nasa.gov/image/${imgLink}/${imgLink}~orig.jpg`

}