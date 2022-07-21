import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import './App.css';
import Filters from './components/Filters';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '',
    cardAttr2: '',
    cardAttr3: '',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    buttonDisabled: true,
    cards: [],
    hasTrunfo: false,
    cardsFilter: [],
    trunfoCheck: false,
  }

  onInputChange = (event) => {
    const { target } = event;
    this.setState({ [target.name]: target.type === 'checkbox'
      ? target.checked : target.value,
    }, () => this.setState({
      buttonDisabled: this.isSaveButtonDisabled(),
    }));
  }

  isSaveButtonDisabled = () => {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
    } = this.state;

    const maxIndividual = 90;
    const maxSoma = 210;

    if (cardName.length === 0) { return true; }
    if (cardDescription.length === 0) { return true; }
    if (cardImage.length === 0) { return true; }
    if (cardRare === ' ') { return true; }
    if (Number(cardAttr1) < 0 || Number(cardAttr1) > maxIndividual) { return true; }
    if (Number(cardAttr2) < 0 || Number(cardAttr2) > maxIndividual) { return true; }
    if (Number(cardAttr3) < 0 || Number(cardAttr3) > maxIndividual) { return true; }
    if (Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) > maxSoma) {
      return true;
    }
    return false;
  }

cardSave = (event) => {
  event.preventDefault();
  const {
    cardName,
    cardDescription,
    cardAttr1,
    cardAttr2,
    cardAttr3,
    cardImage,
    cardRare,
    cardTrunfo,
  } = this.state;
  this.setState(({
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
  }), () => this.verifyTrunfo());
  this.setState((prev) => ({
    cards: [
      ...prev.cards,
      {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardRare,
        cardImage,
        cardTrunfo,
      },
    ],
  }), () => this.setState((prev) => ({
    cardsFilter: [
      ...prev.cards,
    ],
  })));
}

verifyTrunfo = () => {
  const { cards } = this.state;

  // caso haja uma carta super trunfo no baralho, o estado "hasTrunfo" fica verdadeiro
  if (cards.some((card) => card.cardTrunfo === true)) {
    this.setState({ hasTrunfo: true });
  } else {
    this.setState({
      hasTrunfo: false,
    });
  }
}

removeCard = (name) => {
  const { cardsFilter, cards } = this.state;
  // index da carta que está sendo clicada;
  const index = cardsFilter.findIndex((card) => card === name);
  // o método splice "divide" o array a partir de um index e vai até o final definido, nesse caso;
  // começa no index atual e vai para no mesmo, pois o ultimo parametro nao é incluído
  cardsFilter.splice(index, 1);
  cards.splice(index, 1);
  this.setState({ cardsFilter, cards }, () => this.verifyTrunfo());
}

verifyName = (e) => {
  const { cards } = this.state;

  const cartas = cards.filter((card) => (
    (card.cardName.toLowerCase()).includes((e.target.value).toLowerCase())));
  this.setState({ cardsFilter: cartas });
}

verifyRarity = (e) => {
  const { cards } = this.state;

  if (e.target.value === 'todas') {
    this.setState({ cardsFilter: cards });
  } else {
    const cartas = cards.filter((card) => (card.cardRare === e.target.value));
    this.setState({ cardsFilter: cartas });
  }
}

verifySuper = (e) => {
  const { cards } = this.state;

  if (e.target.checked === true) {
    const cartas = cards.filter((card) => (card.cardTrunfo === true));
    this.setState({ cardsFilter: cartas, trunfoCheck: true });
  } else {
    this.setState({ cardsFilter: cards, trunfoCheck: false });
  }
}

render() {
  const {
    cardName,
    cardDescription,
    cardAttr1,
    cardAttr2,
    cardAttr3,
    cardImage,
    cardRare,
    cardTrunfo,
    buttonDisabled,
    hasTrunfo,
    cardsFilter,
    trunfoCheck,
  } = this.state;

  return (
    <div className="App">
      <div className="title">
        <h1>Tryunfo!</h1>
      </div>
      <div className="display-card">
        <Form
          onInputChange={ this.onInputChange }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isSaveButtonDisabled={ buttonDisabled }
          onSaveButtonClick={ this.cardSave }
          hasTrunfo={ hasTrunfo }
        />
        <div>
          <h2 className="preview">Pré-visualização</h2>
          <div className="previewCard">
            <Card
              onInputChange={ this.onInputChange }
              cardName={ cardName }
              cardDescription={ cardDescription }
              cardAttr1={ cardAttr1 }
              cardAttr2={ cardAttr2 }
              cardAttr3={ cardAttr3 }
              cardImage={ cardImage }
              cardRare={ cardRare }
              cardTrunfo={ cardTrunfo }
            />
          </div>
        </div>
      </div>
      <div className="all-cards">
        <h2>Todas as cartas</h2>
        <Filters
          verifyName={ this.verifyName }
          verifyRarity={ this.verifyRarity }
          verifySuper={ this.verifySuper }
          trunfoCheck={ trunfoCheck }
        />
      </div>
      <div className="cards">
        {cardsFilter.map((card) => (
          <div key={ card.cardName } className="card">
            <Card
              key={ card.cardName }
              cardName={ card.cardName }
              cardDescription={ card.cardDescription }
              cardAttr1={ card.cardAttr1 }
              cardAttr2={ card.cardAttr2 }
              cardAttr3={ card.cardAttr3 }
              cardImage={ card.cardImage }
              cardRare={ card.cardRare }
              cardTrunfo={ card.cardTrunfo }
            />
            <button
              type="button"
              data-testid="delete-button"
              className="delete-button"
              onClick={ () => this.removeCard(card) }
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
}

export default App;
