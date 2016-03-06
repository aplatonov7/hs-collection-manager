import React, { PropTypes } from 'react';

import CardListPaging from './CardListPaging';
import Card from './Card';

const CardList = (props) => (
  <div>
    <CardListPaging
      page={props.page}
      lastPage={props.lastPage}
      onPageChange={props.onPageChange} />

    <ul className='row'>
      {props.cards.map((card) => <Card
        card={card}
        onCardClick={props.onCardClick} />)}
    </ul>
  </div>
);

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default CardList;
