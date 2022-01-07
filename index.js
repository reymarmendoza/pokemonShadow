const API = 'https://pokeapi.co/api/v2/'

const pokemon = 'pokemon/dragonite'
const url = API.concat(pokemon)

const searchBtn = document.querySelector('#search')
searchBtn.addEventListener('click', () => {
	fetch(url)
		.then(data => {
			console.log(data)
		})
		.catch(error => {
			console.warn(error)
		})
})
