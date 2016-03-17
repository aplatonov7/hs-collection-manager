import React, { Component, PropTypes } from 'react';
import cardsActions from 'redux/modules/cards/actions';
import managerActions from 'redux/modules/manager/actions';
import { connect } from 'react-redux';

import selectors from 'redux/modules/manager/selectors';

import CollectionHeader from 'components/Collection/CollectionHeader';
import TextFilter from 'components/CollectionFilters/TextFilter';
import CardListWrap from 'components/CardListWrap/CardListWrap';

const mapStateToProps = (state) => ({
  manager: state.manager,
  cards: state.cards,
  collection: selectors.collectionPagedSelector(state),
  pool: selectors.poolPagedSelector(state),
  poolLastPage: selectors.poolLastPageSelector(state),
  collectionLastPage: selectors.collectionLastPageSelector(state),
  dustCost: selectors.dustCostSelector(state)
});

export class CardManager extends Component {
  static propTypes = {
    cards: PropTypes.object,
    manager: PropTypes.object,
    dispatch: PropTypes.func,
    loadCards: PropTypes.func,
    addCard: PropTypes.func,
    removeCard: PropTypes.func,
    changePagePool: PropTypes.func,
    changePageCollection: PropTypes.func,
    changeCostFilter: PropTypes.func,
    changeRarityFilter: PropTypes.func,
    changeClassFilter: PropTypes.func,
    changeNameFilter: PropTypes.func,
    getAllCards: PropTypes.func,
    discardAllCards: PropTypes.func
  };

  handleSaveClick () {
    window.localStorage.setItem('collection', JSON.stringify(this.props.cards.cardsById));
  }

  handleLoadClick () {
    this.props.loadCards();
  }

  handleTextFilterChange (e) {
    let name = e.target.value ? e.target.value : false;
    this.props.changeNameFilter(name);
  }

  handleRarityFilterChange (e) {
    let filter = e.currentTarget.value !== 'None' ? e.currentTarget.value : false;
    this.props.changeRarityFilter(filter);
  }

  handleClassFilterChange (pClass) {
    let filter = pClass === this.props.manager.filters.playerClass ? false : pClass;
    this.props.changeClassFilter(filter);
  }

  handleCostFilterChange (cost) {
    let filter = cost === this.props.manager.filters.cost ? false : cost;
    this.props.changeCostFilter(filter);
  }

  handleUploadClick (e) {
    document.getElementById('jsonFileInput').click();
  }

  handleFileUpload (e) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const cards = JSON.parse(event.target.result);
      this.props.loadCards(cards);
    };
    reader.readAsText(e.target.files[0]);
    e.target.value = '';
  }

  componentDidMount () {
    if (Object.keys(this.props.cards.cardsById).length === 0) this.props.loadCards();
  }

  render () {
    return (
      <div>
        <CollectionHeader
          onSaveClick={_ => this.handleSaveClick()}
          onLoadClick={_ => this.handleLoadClick()}
          dust={this.props.dustCost}
          filters={this.props.manager.filters}
          onRarityFilterChange={e => this.handleRarityFilterChange(e)}
          onClassFilterChange={e => this.handleClassFilterChange(e)}
          onCostFilterChange={e => this.handleCostFilterChange(e)}
          onGetCardsBtnClick={this.props.getAllCards}
          onDiscardCardsBtnClick={this.props.discardAllCards} />

        <TextFilter onTextFilterChange={e => this.handleTextFilterChange(e)} />

        <CardListWrap
          loading={this.props.cards.loading}
          onFileUpload={e => this.handleFileUpload(e)}
          onUploadClick={e => this.handleUploadClick(e)}
          pool={this.props.pool}
          poolPage={this.props.manager.poolPage}
          poolLastPage={this.props.poolLastPage}
          collection={this.props.collection}
          collectionPage={this.props.manager.collectionPage}
          collectionLastPage={this.props.collectionLastPage}
          cards={this.props.cards.cardsByid}
          onPageChangePool={this.props.changePagePool}
          onPageChangeCollection={this.props.changePageCollection}
          addCard={this.props.addCard}
          removeCard={this.props.removeCard} />
      </div>
    );
  }
}

export default connect(mapStateToProps, {...cardsActions, ...managerActions})(CardManager);
