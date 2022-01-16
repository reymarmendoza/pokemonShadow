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
		.catch(error => {
			console.warn(error)
		})
		
		loadOptions()
		.then(() => {
			console.log('optionsPkm:', optionsPkm)
			const optContainer = document.querySelector('#selectPkm')
			if (document.querySelector('.pkmOption')){
				const options =  document.querySelectorAll('.pkmOption')
				options.forEach(opt => opt.remove())
			}
			for (let i = 0; i < 4; i++) {
				const radioOptions = document.createElement('input')
				const radioLabel = document.createElement('label')
				const div = document.createElement('div')
				const texto = `pkmSelection${i}`
				radioOptions.setAttribute('type', 'radio')
				radioOptions.setAttribute('name', texto)
				div.append(radioOptions)
				radioLabel.setAttribute('for', texto)
				radioLabel.innerText = `${optionsPkm[i]}`
				div.append(radioLabel)
				div.classList.add('pkmOption')
				optContainer.append(div)
				// document.getElementById("red").checked = true; ******************
			}
		})

	function generateRdmNum() {
		return Math.floor(Math.random() * (152 - 1) + 1)
	}

	function loadOptions() {
		return new Promise((resolve, reject) => {
			for (let i = 0; i < 3; i++) {
				fetchPkmNames()
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
