const API = 'https://pokeapi.co/api/v2/pokemon/'

const refreshBtn = document.querySelector('#refresh')
const sendBtn = document.querySelector('#send')
const form = document.querySelector('form')
let pokemon = ''

function sortOptions(pokemons) {
	pokemons = capitalName(pokemons)
	for (let i = 0; i < 4; i++) {
		const rdm = Math.floor(Math.random() * (3 - 0))
		let keeper = pokemons[rdm]
		pokemons[rdm] = pokemons[i]
		pokemons[i] = keeper
	}
	return pokemons
}

function capitalName(name) {
	return name.map(pkm => {
		let pkmName = pkm.split('')
		pkmName[0] = pkmName[0].toUpperCase()
		return pkmName.join('')
	})
}

function generateRdmNum() {
	return Math.floor(Math.random() * (152 - 1) + 1)
}

function checkMessages() {
	const msgRes = document.querySelector('.msgRes')
	if (msgRes) {
		msgRes.remove()
	}
}

refreshBtn.addEventListener('click', () => {
	let optionsPkm = []
	
	checkMessages()

	fetch(`${API}${generateRdmNum()}`)
		.then(res => res.json())
		.then(res => {
			pokemon = res.forms[0].name
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
			optionsPkm = sortOptions(optionsPkm)
			const optContainer = document.querySelector('#selectPkm')
			
			if (document.querySelector('.pkmOption')){
				const options =  document.querySelectorAll('.pkmOption')
				options.forEach(opt => opt.remove())
			}

			for (let i = 0; i < 4; i++) {
				const radioOptions = document.createElement('input')
				const radioLabel = document.createElement('label')
				const div = document.createElement('div')

				radioOptions.setAttribute('type', 'radio')
				radioOptions.setAttribute('id', `${optionsPkm[i]}`)
				radioOptions.setAttribute('name', 'pkmSelection')
				radioOptions.setAttribute('value', `${optionsPkm[i]}`)
				div.append(radioOptions)
				
				radioLabel.setAttribute('for', `${optionsPkm[i]}`)
				radioLabel.innerText = `${optionsPkm[i]}`
				div.append(radioLabel)

				div.classList.add('pkmOption')
				optContainer.append(div)
			}
		})

	function loadOptions() {
		return new Promise((resolve, reject) => {
			for (let i = 0; i < 3; i++) {
				fetchPkmNames()
					.then(res => {
						optionsPkm.push(res)
						if (optionsPkm.length === 4) {
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

sendBtn.addEventListener('click', e => {
	e.preventDefault()
	checkMessages()
	const options = [...document.querySelectorAll("input[name='pkmSelection']")]
	const selected = options.filter(opt => (opt.checked))

	const p = document.createElement('p')
	p.classList.add('msgRes')
	if (selected[0].value.toLowerCase() === pokemon) {
		p.innerText = 'Ganaste!!'
	} else {
		p.innerText = 'Vuelve a intentar'
	}

	form.append(p)
})