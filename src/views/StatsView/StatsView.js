import React from 'react';
import ClassStats from 'containers/ClassStats/ClassStats';

export class StatsView extends React.Component {
  render () {
    return (
      <div className='container'>
        <h2 className='center-align'>Your Collection Stats</h2>
        <ClassStats/>
      </div>
    );
  }
}

export default StatsView;
