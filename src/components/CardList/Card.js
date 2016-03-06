import React, { PropTypes } from 'react';

import classes from './Card.scss';
import ImageLoader from 'react-imageloader';
import dog from 'assets/images/dog.gif';

function preloader () {
  return <img className='responsive-img' src={dog} alt='Waiting dog' title='Please wait' />;
}

const Card = (props) => (
  <li className={classes.cardWrapper + ' col s6 m3 center-align'} key={props.card.cardId}>
    <ImageLoader
      src={props.card.img}
      wrapper={React.DOM.div}
      className={classes.cardWrapper}
      imgProps={{
        className: 'responsive-img',
        onClick: () => props.onCardClick(props.card.cardId)
      }}
      preloader={preloader}
    >
      {preloader()}
      <span style={{fontSize: '16px'}}>{props.card.name}</span>
    </ImageLoader>
    <div className={classes.copies}>x{props.card.copies ? props.card.copies : 0}</div>
  </li>
);

Card.propTypes = {
  card: PropTypes.shape({
    cardId: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    copies: PropTypes.number
  }),
  onCardClick: PropTypes.func.isRequired
};

export default Card;
