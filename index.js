const API = 'https://pokeapi.co/api/v2/pokemon/'

const refreshBtn = document.querySelector('#refresh')
const searchBtn = document.querySelector('#search')
const form = document.querySelector('form')

refreshBtn.addEventListener('click', () => {
	const numPkm = Math.floor(Math.random() * (152 - 1) + 1)
	const url = `${API}${numPkm}`

	fetch(url)
		.then(res => res.json())
		.then(res => {
			console.log(res.forms[0].name)
			if (document.querySelector('.shadow')) {
				document.querySelector('.shadow').remove()
			}
			const imgPkm = document.createElement('img')
			imgPkm.src = res.sprites.front_default
			imgPkm.classList.add('shadow')
			imgPkm.setAttribute('height', '192')
			imgPkm.setAttribute('width', '192')
			form.after(imgPkm)
		})
		.catch(error => {
			console.warn(error)
		})
})

searchBtn.addEventListener('click', () => {
	const guess = document.querySelector('#userGuess').value
	console.log('guess:', guess)
})
