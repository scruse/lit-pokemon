import {html, LitElement, css} from 'lit';

import './pokemon-details.js';

class PokemonList extends LitElement {
  static properties = {
    pokemons: {type: Array},
    pokemon: {type: Object},
  };

  static styles = css`
    :host {
      display: block;
    }
    .list {
      display: flex;
      flex-direction: column;
    }
    ul {
      list-style: none;
      padding: 0;
    }

    li {
      display: flex;
    }
    button {
      background: none;
      border: 1px solid grey;
      margin: 2px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
    }
    button:hover {
      text-decoration: underline;
    }
  `;

  constructor() {
    super();
    this.pokemons = [];
  }

  async fetchPokemon(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  _handleFetchPokemon(e) {
    const name = e.target.innerText;
    const {url} = this.pokemons.find((pokemon) => pokemon.name === name);

    const response = this.fetchPokemon(url);

    response.then((data) => {
      this.pokemon = data;
      this.requestUpdate();
    });
  }

  _dispatchPokemonSelected(e) {
    console.log(e);
    console.log(e.target.innerText);
    const options = {
      detail: {name: e.target.innerText},
      bubbles: true,
      composed: true,
    };
    const customEvent = new CustomEvent('poke', options);

    console.log(customEvent);
    this.dispatchEvent(new Event('poke', options));
    console.log(this.dispatchEvent(new CustomEvent('poke', options)));
  }

  render() {
    return html`
      <div class="list">
        <ul>
          ${this.pokemons.map(
            (pokemon) =>
              html`<li>
                <button @click="${this._dispatchPokemonSelected}">
                  ${pokemon.name}
                </button>
              </li>`
          )}
        </ul>
      </div>
    `;
  }
}

customElements.define('pokemon-list', PokemonList);
