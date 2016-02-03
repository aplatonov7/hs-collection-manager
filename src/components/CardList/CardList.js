import React, { Component, PropTypes } from 'react';
import classes from './CardList.scss';
import ImageLoader from 'react-imageloader';

export default class CardList extends Component {
  static propTypes = {
    cards: PropTypes.array,
    page: PropTypes.number,
    lastPage: PropTypes.number,
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    onCardClick: PropTypes.func,
    changePage: PropTypes.func
  };

  render () {
    const renderPaging = (page, lastPage) => {
      let pager = [];
      const depth = 2;

      pager.push(<li key={'-1'} className='waves-effect' onClick={() => this.props.changePage(this.props.page - 1)}><i
        className='material-icons'>chevron_left</i></li>);

      if (lastPage < depth * 2 + 5) {
        for (let i = 1; i <= lastPage; i++) {
          pager.push(<li key={i} className={i === page ? 'light-blue darken-4 white-text' : ''}
                         onClick={() => this.props.changePage(i)}>{i}</li>);
        }
      } else {
        if (page < depth + 3) {
          for (let i = 1; i <= depth * 2 + 3; i++) {
            pager.push(<li key={i} className={i === page ? 'light-blue darken-4 white-text' : ''}
                           onClick={() => this.props.changePage(i)}>{i}</li>);
          }

          pager.push(<li key={'spacer_right'}>..</li>);
          pager.push(<li key={lastPage} onClick={() => this.props.changePage(lastPage)}>{lastPage}</li>);
        } else if (page > lastPage - depth - 3) {
          pager.push(<li key={1} onClick={() => this.props.changePage(1)}>{1}</li>);
          pager.push(<li key={'spacer_left'}>..</li>);

          for (let i = lastPage - 2 - depth * 2; i <= lastPage; i++) {
            pager.push(<li key={i} className={i === page ? 'light-blue darken-4 white-text' : ''}
                           onClick={() => this.props.changePage(i)}>{i}</li>);
          }
        } else {
          pager.push(<li key={1} onClick={() => this.props.changePage(1)}>{1}</li>);
          pager.push(<li key={'spacer_left'}>..</li>);

          for (let i = page - depth; i <= page + depth; i++) {
            pager.push(<li key={i} className={i === page ? 'light-blue darken-4 white-text' : ''}
                           onClick={() => this.props.changePage(i)}>{i}</li>);
          }

          pager.push(<li key={'spacer_right'}>..</li>);
          pager.push(<li key={lastPage} onClick={() => this.props.changePage(lastPage)}>{lastPage}</li>);
        }
      }

      pager.push(<li key={'+1'} className='waves-effect' onClick={() => this.props.changePage(this.props.page + 1)}><i
        className='material-icons'>chevron_right</i></li>);

      return pager;
    };

    function preloader () {
      return <div className='preloader-wrapper big active'>
        <div className='spinner-layer spinner-blue-only'>
          <div className='circle-clipper left'>
            <div className='circle'></div>
          </div>
          <div className='gap-patch'>
            <div className='circle'></div>
          </div>
          <div className='circle-clipper right'>
            <div className='circle'></div>
          </div>
        </div>
      </div>;
    }

    return (
      <div>
        <ul className='pagination center-align'>
          {renderPaging(this.props.page, this.props.lastPage)}
        </ul>
        <ul className='row'>
          {this.props.cards.map((card) => {
            return (
              <li className={classes.listCard + ' col s6 m3 center-align'} key={card.cardId}>
                <ImageLoader
                  src={card.img}
                  wrapper={React.DOM.div}
                  className={classes.cardWrapper}
                  imgProps={{
                    className: 'responsive-img',
                    onClick: () => this.props.onCardClick(card.cardId)
                  }}
                  preloader={preloader}
                >
                  Image load failed!
                </ImageLoader>
                <div className={classes.copies}>x{card.copies}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
