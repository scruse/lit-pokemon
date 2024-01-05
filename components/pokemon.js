import { LitElement, html, css } from "lit";
import "./pokemon-details.js";
import "./pokemon-list.js";

export class Pokemon extends LitElement {
  static properties = {
    pokemon: { type: Object },
    pokemons: { type: Array },
  };

  static styles = css`
    .content-wrapper {
      display: flex;
    }
    .column {
      display: flex;
      flex-direction: column;
      width: 20%;
    }
  `;

  constructor() {
    super();
    this.pokemon = {};
    this.pokemons = [];
  }
  connectedCallback() {
    super.connectedCallback();
    this.fetchPokemons();
  }

  async fetchPokemons() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await res.json();
    this.pokemons = data.results;
    this.requestUpdate();
  }

  async fetchPokemon(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  async _handlePokemonSelected(event) {
    console.log(event);
    if (event.detail) {
      const { name } = event.detail;
      const pokemon = this.pokemons.find((pokemon) => pokemon.name === name);

      const response = await this.fetchPokemon(pokemon.url);

      this.pokemon = response;

      this.requestUpdate();
    }
  }

  render() {
    return html`
      <div class="content-wrapper">
        <pokemon-list
          .pokemons=${this.pokemons}
          @poke=${this._handlePokemonSelected}
          class="column"
        ></pokemon-list>
        <pokemon-details
          .pokemon=${this.pokemon}
          class="column"
        ></pokemon-details>
      </div>
    `;
  }
}

customElements.define("pokemon-app", Pokemon);
