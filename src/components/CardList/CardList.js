import React, { Component, PropTypes } from 'react';
import classes from './CardList.scss';

export default class CardList extends Component {
  static propTypes = {
    cards: PropTypes.array,
    page: PropTypes.number,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    onCardClick: PropTypes.func,
    changePage: PropTypes.func
  };

  render () {
    let content;

    if (this.props.loaded) {
      content = (
        <ul className='row'>
          {this.props.cards.map((card) => {
            return (
              <li className='col-sm-6 col-md-3' key={card.cardId}
                  onClick={() => this.props.onCardClick(card.cardId)}>
                <img className='img-responsive' src={card.img}/>
                <div className={classes.cardCopies}>x{card.copies}</div>
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <div className={classes.deckBuilder + ' col-xs-6'}>
        <div className={classes.pager}>
          <span className={classes.arrow} onClick={() => this.props.changePage(this.props.page - 1)}>&lt;</span>
          {this.props.page}
          <span className={classes.arrow} onClick={() => this.props.changePage(this.props.page + 1)}>&gt;</span>
        </div>
        {content}
      </div>
    );
  }
}
