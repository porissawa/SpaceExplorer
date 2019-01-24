const imageDiv = document.getElementById('image_div')
let initialQuery = ''
let min, max
let rnd
let currentQuery = document.getElementById('query_selector')

// dataButton.addEventListener('click', getData)
imageDiv.addEventListener('click', getData)
currentQuery.addEventListener('change', getData)

function generateRndNumber(min, max) {
    rnd = Math.floor(Math.random() * (max - min) + min)
    return rnd  
}

async function getData() {
    searchQuery = currentQuery.value

    //get data from nasa image api
    let res = await fetch(`https://images-api.nasa.gov/search?q=${searchQuery}`)
    let data = await res.json()

    //determine how many pages there are for the query
    let numberOfPages = Math.ceil(data.collection.metadata.total_hits / 100)
    let rndPage = Math.floor(Math.random() * (numberOfPages - 1) + 1)

    //fetch new data with randomized page
    res = await fetch(`https://images-api.nasa.gov/search?q=${searchQuery}&page=${rndPage}`)
    data = await res.json()

    //max entries per page
    const max = 99
    //generate random number as to select which description + image combo to show
    generateRndNumber(0, max)
    //get nasa_id param to use on image URL
    let imgLink = data.collection.items[rnd].data[0].nasa_id

    if(data.collection.items[rnd].data[0].media_type !== 'image') {
        getData()
    } else {
        //insert description and image into DOM
        document.getElementById('image_title').innerHTML = data.collection.items[rnd].data[0].title
        document.getElementById('text_output').innerHTML = data.collection.items[rnd].data[0].description
        document.getElementById('img_output').src = `http://images-assets.nasa.gov/image/${imgLink}/${imgLink}~orig.jpg`
    }
}