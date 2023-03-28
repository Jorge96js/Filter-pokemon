document.addEventListener("keyup", e=>{
    //Escucha si coinside con los elementos del buscador
    if(e.target.matches('#buscador')){

        if(e.key ==="Escape")e.target.value =""

        document.querySelectorAll(".pokemon").forEach(pokemon =>
        {
            //Escucha el contenido de la lista coincide con el del evento escuchado 
            pokemon.textContent.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
            ?pokemon.classList.remove("filtro")
            :pokemon.classList.add("filtro")
            ?container.classList.remove("scroll")
            :container.classList.add("scroll")
        })
    }
})


const container = document.querySelector('.container');
const pkmCount = 999;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5',
    dark: '#705848',
    ghost:'#705898',
    ice:'#98D8D8'
};

const mainType = Object.keys(colors);

const fetchPkm = async()=>{
    for(let i = 1; i <= pkmCount; i++){
        await getPkm(i);
    }
}

async function getPkm(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json(); 
    createCard(data)
}

const createCard = (pokemon) =>{

    const pkmElement = document.createElement('div');
    pkmElement.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');
    
    const pkmTypes = pokemon.types.map(type => type.type.name);
    const type = mainType.find(type => pkmTypes.indexOf(type) > -1)
    const color = colors[type];

    pkmElement.style.backgroundColor = color;
    const innerPkm = `
        <div>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
        </div>
        <div class="info">
            <span class="number">Pokedex: ${id}</span>
            <h3 class="name"> Name: ${name} </h3>
            <small class="type">Type: <span>${type}</span> </small>

        </div>
    `

    pkmElement.innerHTML = innerPkm;

    container.appendChild(pkmElement)

}

fetchPkm()