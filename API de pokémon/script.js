const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const ul = document.querySelector('#ul')
const pokemonQuantity = 151



const fetchPokemon = async () => {
    let pokemonArray = []
    for(let i = 1; i <= pokemonQuantity; i++){
         await fetch(getPokemonUrl(i))
         .then(response => response.json())
         .then(pokemons => pokemonArray.push(pokemons))  
    }
    return pokemonArray
}

const pokemonAPI = async () => {
   const pokemonPromises = await fetchPokemon()
   const pokemonLists = await Promise.all(pokemonPromises).then(pokemons => {
            console.log(pokemons)
  
                return pokemons.reduce((acc, pokemon) => {
                    const pokemonNameLength = [...pokemon.name].length
                    const UpperCaseFirstLetter = pokemon.name.toUpperCase().substring(0, 1)
                    const pokemonName = pokemon.name.substring(1, pokemonNameLength)
                    const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                    const moves = pokemon.moves.map(moves => moves.move.name)
                    const someMoves = moves.slice(0, 6)
        

            acc+= ` 
                <li class="card-item col">
                    <h2>${pokemon.id}. Name: ${UpperCaseFirstLetter}${pokemonName}</h2>
                    <img class="card-image ${types[0]}"
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
                    <h5 class="${types[0]}-text uppercase">${types[0]}</h5>
                    <h5 class="${types[1]}-text uppercase">${types[1]}</h5>
                    <button class="btn btn-primary mt-2" data-bs-toggle="dropdown">Moves</button>
                    <div class="dropdown-menu">
                        <div class="dropdown-item">${moves.join('<br>' + '<hr>')}</div>
                    </div>
                </li>
            `
            return acc
        }, '') 
    })
    
     ul.innerHTML = pokemonLists
}

pokemonAPI()

