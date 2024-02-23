const baseApiUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const nameText = document.getElementById("pokemon-name");
const idText = document.getElementById("pokemon-id");
const spriteContainer = document.getElementById("sprite-container");
const weightText = document.getElementById("weight");
const heightText = document.getElementById("height");
const typesContainer = document.getElementById("types");

searchButton.addEventListener("click", async (e) => {
  e.preventDefault();
  if (searchInput.value === "") return;

  const pokemon = await searchPokemon(searchInput.value);

  if (!pokemon) {
    alert("Pokémon not found");
    return;
  }

  const pokemonDetails = await getPokemonDetails(pokemon);
  displayPokemon(pokemonDetails);
});

const searchPokemon = async (query) => {
  let pokemon = {};

  try {
    const res = await fetch(baseApiUrl);
    const data = await res.json();

    query = query.toLowerCase();
    pokemon = data.results.find(
      ({ name, id }) => name === query || id == query
    );
  } catch (err) {
    throw err;
  }

  return pokemon;
};

const getPokemonDetails = async (pokemon) => {
  try {
    const res = await fetch(`${baseApiUrl}/${pokemon.id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};

const displayPokemon = (pokemonDetails) => {
  resetDisplay();

  const { name, id, weight, height, sprites, stats, types } = pokemonDetails;
  nameText.textContent = name.toUpperCase();
  idText.textContent = `#${id}`;

  spriteContainer.innerHTML = `
    <img id="sprite" src="${sprites.front_default}">
  `;

  types.forEach(({ type }) => {
    typesContainer.innerHTML += `
      <span class="type ${type.name}">${type.name.toUpperCase()}</span>
    `;
  });

  weightText.textContent = `Weight: ${weight}`;
  heightText.textContent = `Height: ${height}`;

  stats.forEach(({ base_stat, stat }) => {
    const statText = document.getElementById(stat.name);
    statText.textContent = base_stat;
  });
};

const resetDisplay = () => {
  typesContainer.innerHTML = "";
};
