const API = 'https://pokeapi.co/api/v2/pokemon/'

const searchBtn = document.querySelector('#search')

searchBtn.addEventListener('click', () => {
	const guess = document.querySelector('#userGuess').value
	const form = document.querySelector('form')
	const url = `${API}${guess}`

	fetch(url)
		.then(res => res.json())
		.then(res => {
			const imgPkm = document.createElement('img')
			imgPkm.src = res.sprites.front_default
			imgPkm.classList.add('shadow')
			form.after(imgPkm)
		})
		.catch(error => {
			console.warn(error)
		})
})
