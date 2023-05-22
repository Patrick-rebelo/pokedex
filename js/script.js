const pokemonName = document.querySelector('.nome-pokemon')
const pokemonNumero = document.querySelector('.numero-pokemon')
const pokemonImagem = document.querySelector('.pokemon-imagem')

const form = document.querySelector('.form')
const input = document.querySelector('.input-search')
const botaoPrev = document.querySelector('.btn-prev')
const botaoNext = document.querySelector('.btn-next')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const dados = await APIResponse.json();
        return dados;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumero.innerHTML = '';

    const dados = await fetchPokemon(pokemon);

    if (dados) {
        pokemonImagem.style.display = 'block';
        pokemonName.innerHTML = dados.name;
        pokemonNumero.innerHTML = dados.id;
        pokemonImagem.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = dados.id;
    } else {
        pokemonImagem.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado :(';
        pokemonNumero.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
})

botaoPrev.addEventListener('click', () => {
    if(searchPokemon > 1){ 
    searchPokemon -= 1;
    renderPokemon(searchPokemon) 
    }
});

botaoNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
 });

renderPokemon(searchPokemon)