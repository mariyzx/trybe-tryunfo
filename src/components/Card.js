import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
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
    } = this.props;
    return (
      <div className="cardTryunfo">
        <p className="info-card" data-testid="name-card">
          <b>{cardName}</b>
        </p>
        <img
          src={ cardImage }
          alt={ cardName }
          data-testid="image-card"
          className="img-card"
        />
        <p className="info-card" data-testid="description-card">
          {cardDescription}
        </p>
        <p className="info-card" data-testid="attr1-card">
          Feitiços:
          {' '}
          {cardAttr1}
        </p>
        <p className="info-card" data-testid="attr2-card">
          Coragem:
          {' '}
          {cardAttr2}
        </p>
        <p className="info-card" data-testid="attr3-card">
          Inteligência:
          {' '}
          {cardAttr3}
        </p>
        <p className="info-card" data-testid="rare-card">
          Raridade:
          {' '}
          {cardRare}
        </p>
        {((cardTrunfo === true) ? <p data-testid="trunfo-card">Super Trunfo</p> : <p />)}
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
};

export default Card;
