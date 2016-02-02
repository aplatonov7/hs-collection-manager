import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as counterActions } from 'redux/modules/counter';
import CardManager from 'containers/CardManager/CardManager';

const mapStateToProps = (state) => ({
  counter: state.counter
});
export class HomeView extends React.Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  };

  render () {
    return (
      <div>
        <CardManager />
      </div>
    );
  }
}

export default connect(mapStateToProps, counterActions)(HomeView);
