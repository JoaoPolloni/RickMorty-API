window.onload = async () => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "https://rickandmortyapi.com/api/character")
    xhr.send()
    xhr.responseType = "json"

    xhr.onload = async () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = xhr.response
            const results = response.results

            let personagens = results.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    status: item.status,
                    species: item.species,
                    gender: item.gender,
                    origin: item.origin.name,
                    location: item.location.name,
                    image: item.image,
                    episode: item.episode
                }
            }).slice(0, 10)

            for (let i = 0; i <= 4; i++) {
                const personagem = personagens[i]
                adicionarCardPersonagem(personagem, 'container1')
            }

            for (let i = 5; i <= 9; i++) {
                const personagem = personagens[i]
                adicionarCardPersonagem(personagem, 'container2')
            }

            for await (let personagem of personagens) {
                adicionarPersonagemATabela(personagem)
            }

            document.getElementById('btnAdicionar').onclick = async event => {
                event.preventDefault()

                const name = document.getElementById('inputName').value
                const gender = document.getElementById('inputGender').value
                const episode = document.getElementById('inputEpisode').value
            
                if (!name || !gender || !episode)
                    return alert('Preencha todos os campos')
            
            
                const personagem = {
                    name: name,
                    gender: gender,
                    episode: [episode]
                }
            
                personagens.push(personagem)
                adicionarPersonagemATabela(personagem)
            }
        } else {
            alert('Erro ao carregar informações da API: ' + xhr.status)
        }
    }
}

function adicionarPersonagemATabela(personagem) {
    const tr = document.createElement('tr')
    const tdName = document.createElement('td')
    const tdGender = document.createElement('td')
    const tdTotalEpisodes = document.createElement('td')
    const tdEpisodes = document.createElement('td')
    const tdRule = document.createElement('td')

    tdName.innerText = personagem.name
    tdGender.innerText = personagem.gender
    tdTotalEpisodes.innerText = personagem.episode.length
    tdRule.innerText = personagem.episode.length >= 7 ? 'Passed' : 'Failed'

    const arrayEpisodios = personagem.episode.slice(0, 5)
    arrayEpisodios.concat(personagem.episode.slice(-2))
    tdEpisodes.innerText = arrayEpisodios.join('\n')

    tr.appendChild(tdName)
    tr.appendChild(tdGender)
    tr.appendChild(tdTotalEpisodes)
    tr.appendChild(tdEpisodes)
    tr.appendChild(tdRule)

    document.getElementById('tabela').appendChild(tr)
}

function adicionarCardPersonagem(personagem, container) {
    const div = document.createElement('div')
    const image = document.createElement('img')
    const id = document.createElement('h6')
    const name = document.createElement('h3')
    const status = document.createElement('h5')
    const gender = document.createElement('h5')

    div.classList = 'card'
    image.src = personagem.image
    image.classList = 'card-image'
    name.innerText = personagem.name
    id.innerText = `ID: ${personagem.id}`
    status.innerText = `Status: ${personagem.status}`
    gender.innerText = `Gender: ${personagem.gender}`

    div.appendChild(image)
    div.appendChild(id)
    div.appendChild(name)
    div.appendChild(status)
    div.appendChild(gender)

    document.getElementById(container).appendChild(div)
}