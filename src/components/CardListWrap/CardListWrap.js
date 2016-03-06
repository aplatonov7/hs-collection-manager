import React, { PropTypes } from 'react';
import dog from 'assets/images/dog.gif';

import CardList from 'components/CardList/CardList';

const Loading = () => (
  <div className='center-align'>
    <div className='col s12'>
      <img src={dog} className='responsive-img' alt='Waiting dog'
           title='Please wait' style={{width: '100px', transform: 'scale(3)'}}/>

      <div className='progress col s8 offset-s2'>
        <div className='indeterminate'></div>
      </div>
    </div>
  </div>
);

const CardListWrap = (props) => (
  <div className='row'>
    {
      props.loading
        ? <Loading />
        : <div className='row'>
        <div className='col s6'>
          <h4 className='center-align grey-text text-lighten-3'>
            <input id='jsonFileInput' type='file' style={{display: 'none'}} onChange={props.onFileUpload}/>
            <a className='btn-floating btn waves-effect waves-light blue darken-3'
               title='Export you collection from json file'
               style={{marginRight: '10px'}} onClick={props.onUploadClick}><i className='material-icons'>input</i></a>
            Card pool
          </h4>
          <CardList
            cards={props.pool.displayedCards.map(id => ({
                  ...props.cards[id],
                  copies: props.cards[id].rarity === 'Legendary' ? 1 - props.cards[id].copies : 2 - props.cards[id].copies
                }))}
            page={props.pool.page}
            lastPage={props.pool.lastPage}
            onPageChange={props.onPageChangePool}
            onCardClick={props.addCard}
          />
        </div>
        <div className='col s6'>
          <h4 className='center-align grey-text text-lighten-3'>
            Your collection
            <a className='btn-floating btn waves-effect waves-light blue darken-3'
               title='Download your collection to json file' style={{marginLeft: '10px'}}
               href={'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(props.cards))}
               download='collection.json'><i className='material-icons'>play_for_work</i></a>
          </h4>
          <CardList
            cards={props.collection.displayedCards.map(id => props.cards[id])}
            page={props.collection.page}
            lastPage={props.collection.lastPage}
            onPageChange={props.onPageChangeCollection}
            onCardClick={props.removeCard}
          />
        </div>
      </div>
    }
  </div>
);

CardListWrap.propTypes = {};

export default CardListWrap;
