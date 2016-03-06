import React, {PropTypes} from 'react';

function buildPager (page, lastPage, onPageChange) {
  let pager = [];
  const depth = 2;

  pager.push(<li key={'-1'} className='waves-effect' onClick={() => onPageChange(page - 1)}><i
    className='material-icons'>chevron_left</i></li>);

  if (lastPage < depth * 2 + 5) {
    for (let i = 1; i <= lastPage; i++) {
      pager.push(<li key={i} className={i === page ? 'light-blue darken-4 white-text' : ''}
                     onClick={() => onPageChange(i)}>{i}</li>);
    }
  } else {
    if (page < depth + 3) {
      for (let i = 1; i <= depth * 2 + 3; i++) {
        pager.push(<li key={i} className={i === page ? 'light-blue darken-4 white-text' : ''}
                       onClick={() => onPageChange(i)}>{i}</li>);
      }

      pager.push(<li key={'spacer_right'}>..</li>);
      pager.push(<li key={lastPage} onClick={() => onPageChange(lastPage)}>{lastPage}</li>);
    } else if (page > lastPage - depth - 3) {
      pager.push(<li key={1} onClick={() => onPageChange(1)}>{1}</li>);
      pager.push(<li key={'spacer_left'}>..</li>);

      for (let i = lastPage - 2 - depth * 2; i <= lastPage; i++) {
        pager.push(<li key={i} className={i === page ? 'light-blue darken-4 white-text' : ''}
                       onClick={() => onPageChange(i)}>{i}</li>);
      }
    } else {
      pager.push(<li key={1} onClick={() => onPageChange(1)}>{1}</li>);
      pager.push(<li key={'spacer_left'}>..</li>);

      for (let i = page - depth; i <= page + depth; i++) {
        pager.push(<li key={i} className={i === page ? 'light-blue darken-4 white-text' : ''}
                       onClick={() => onPageChange(i)}>{i}</li>);
      }

      pager.push(<li key={'spacer_right'}>..</li>);
      pager.push(<li key={lastPage} onClick={() => onPageChange(lastPage)}>{lastPage}</li>);
    }
  }

  if (pager.length === 1) pager.push((<li key={'1'} className='light-blue darken-4 white-text'>1</li>));

  pager.push(<li key={'+1'} className='waves-effect' onClick={() => onPageChange(page + 1)}><i
    className='material-icons'>chevron_right</i></li>);

  return pager;
}

const CardListPaging = (props) => (
  <ul className='pagination center-align'>
    {buildPager(props.page, props.lastPage, props.onPageChange)}
  </ul>
);

CardListPaging.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default CardListPaging;
