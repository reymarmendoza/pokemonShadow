const API = 'https://pokeapi.co/api/v2/pokemon/'

const refreshBtn = document.querySelector('#refresh')
const searchBtn = document.querySelector('#search')
const form = document.querySelector('form')

refreshBtn.addEventListener('click', () => {
	let optionsPkm = []

	fetch(`${API}${generateRdmNum()}`)
		.then(res => res.json())
		.then(res => {
			optionsPkm.push(res.forms[0].name)

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
		// <input type='radio' class='pkmOption' name='pkmSelection' />
		.catch(error => {
			console.warn(error)
		})

	loadOptions()
		.then(() => console.log('optionsPkm:', optionsPkm))

	function generateRdmNum() {
		return Math.floor(Math.random() * (152 - 1) + 1)
	}

	function loadOptions() {
		return new Promise((resolve, reject) => {
			for (let i = 0; i < 3; i++) {
				fetchPkmNames()
					// .then(res => console.log(res))
					.then(res => {
						optionsPkm.push(res)
						if (i === 2) {
							resolve()
						}
					})
					.catch(err => {
						console.log(err)
						reject(err)
					})
			}
		})
	}

	function fetchPkmNames() {
		return new Promise((resolve, reject) => {
			fetch(`${API}${generateRdmNum()}`)
				.then(res => res.json())
				.then(res => resolve(res.forms[0].name))
				.catch(err => reject(err))
		})
	}
})

searchBtn.addEventListener('click', () => {
	const guess = document.querySelector('#userGuess').value
	console.log('guess:', guess)
})
