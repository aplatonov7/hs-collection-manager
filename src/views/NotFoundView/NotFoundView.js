import React from 'react';
import { Link } from 'react-router';

export class NotFoundView extends React.Component {
  render () {
    return (
      <div className='center-align'>
        <h1>Nothing to see here. Move along</h1>
        <Link to='/' className='waves-effect waves-light btn-flat white-text'>Back To Your Collection</Link>
      </div>
    );
  }
}

export default NotFoundView;
