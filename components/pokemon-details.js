import {LitElement, html, css} from 'lit-element';

export class PokemonDetails extends LitElement {
  static properties = {
    pokemon: {type: Object},
  };

  static styles = css`
    :host {
      display: block;
    }
    .card {
      border: 1px solid #ccc;
      border-radius: 2px;
      padding: 16px;
      margin: 16px;
      width: 200px;
      height: 200px;
      text-align: center;
    }
    img {
      width: 100px;
      height: 100px;
    }
  `;

  constructor() {
    super();
    this.pokemon = {};
  }

  render() {
    return html`
      <div class="card">
        <h1>${this.pokemon.name}</h1>
        <img src=${this.pokemon.sprites.other.dream_world.front_default} />
      </div>
    `;
  }
}

customElements.define('pokemon-details', PokemonDetails);
