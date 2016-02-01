import React, {Component, PropTypes} from 'react';
import {Loader} from 'components';

export default class CardList extends Component {
  static propTypes = {
    cards: PropTypes.array,
    page: PropTypes.number,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    onCardClick: PropTypes.func,
    changePage: PropTypes.func
  };

  render() {
    const style = require('./CardList.scss');
    let content;

    if (this.props.loading) {
      content = <Loader />;
    }

    if (this.props.loaded) {
      content = (
        <ul className="row">
          {this.props.cards.map((card) => {
            return (
              <li className="col-sm-6 col-md-3" key={card.cardId}
                  onClick={this.props.onCardClick.bind(this, card.cardId)}>
                <img className="img-responsive" src={card.img} />
                <div className={style.cardCopies}>x{card.copies}</div>
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <div className={style.deckBuilder + ' col-xs-6'}>
        <div className={style.pager}>
          <span className={style.arrow} onClick={this.props.changePage.bind(this, this.props.page - 1)}>&lt;</span>
          {this.props.page}
          <span className={style.arrow} onClick={this.props.changePage.bind(this, this.props.page + 1)}>&gt;</span>
        </div>
        {content}
      </div>
    );
  }
}
