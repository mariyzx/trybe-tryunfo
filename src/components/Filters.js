import React from 'react';
import PropTypes from 'prop-types';

class Filters extends React.Component {
  render() {
    const {
      verifyName,
      verifyRarity,
      verifySuper,
      trunfoCheck,
    } = this.props;
    return (
      <div className="search-input">
        <p>Filtros de busca:</p>
        <label htmlFor="search">
          <input
            type="text"
            data-testid="name-filter"
            name="search"
            placeholder="Nome..."
            className="search"
            onChange={ verifyName }
            disabled={ trunfoCheck }
          />
        </label>
        <label htmlFor="rarity">
          <select
            data-testid="rare-filter"
            name="rarity"
            onChange={ verifyRarity }
            disabled={ trunfoCheck }
            className="search"
          >
            <option value="todas">todas</option>
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        <label htmlFor="trunfo">
          Super Trunfo
          <input
            type="checkbox"
            data-testid="trunfo-filter"
            name="trunfo"
            onChange={ verifySuper }
            className="search"
          />
        </label>
      </div>
    );
  }
}

Filters.propTypes = {
  verifyName: PropTypes.func.isRequired,
  verifyRarity: PropTypes.func.isRequired,
  verifySuper: PropTypes.func.isRequired,
  trunfoCheck: PropTypes.bool.isRequired,
};

export default Filters;
