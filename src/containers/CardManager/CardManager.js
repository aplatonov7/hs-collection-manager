import React, { Component, PropTypes } from 'react';
import { actions as cardManagerActions } from 'redux/modules/cardManager';
import { connect } from 'react-redux';

import CollectionHeader from 'components/Collection/CollectionHeader';
import TextFilter from 'components/CollectionFilters/TextFilter';
import CardListWrap from 'components/CardListWrap/CardListWrap';

const mapStateToProps = (state) => ({
  cardManager: state.cardManager,
  loading: state.loading
});

export class CardManager extends Component {
  static propTypes = {
    cardManager: PropTypes.object,
    dispatch: PropTypes.func,
    saveCards: PropTypes.func,
    load_success: PropTypes.func,
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
    discardAllCards: PropTypes.func,
    loading: PropTypes.bool
  };

  handleSaveClick () {
    this.props.saveCards();
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
    let filter = pClass === this.props.cardManager.filters.playerClass ? false : pClass;
    this.props.changeClassFilter(filter);
  }

  handleCostFilterChange (cost) {
    let filter = cost === this.props.cardManager.filters.cost ? false : cost;
    this.props.changeCostFilter(filter);
  }

  handleUploadClick (e) {
    document.getElementById('jsonFileInput').click();
  }

  handleFileUpload (e) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const cards = JSON.parse(event.target.result);
      this.props.load_success(cards);
    };
    reader.readAsText(e.target.files[0]);
    e.target.value = '';
  }

  componentDidMount () {
    if (Object.keys(this.props.cardManager.cards).length === 0) this.props.loadCards();
  }

  render () {
    return (
      <div>
        <CollectionHeader
          onSaveClick={_ => this.handleSaveClick()}
          onLoadClick={_ => this.handleLoadClick()}
          dust={this.props.cardManager.dustCost}
          filters={this.props.cardManager.filters}
          onRarityFilterChange={e => this.handleRarityFilterChange(e)}
          onClassFilterChange={e => this.handleClassFilterChange(e)}
          onCostFilterChange={e => this.handleCostFilterChange(e)}
          onGetCardsBtnClick={this.props.getAllCards}
          onDiscardCardsBtnClick={this.props.discardAllCards} />

        <TextFilter onTextFilterChange={e => this.handleTextFilterChange(e)} />

        <CardListWrap
          loading={this.props.loading}
          onFileUpload={e => this.handleFileUpload(e)}
          onUploadClick={e => this.handleUploadClick(e)}
          pool={this.props.cardManager.pool}
          collection={this.props.cardManager.collection}
          cards={this.props.cardManager.cards}
          onPageChangePool={this.props.changePagePool}
          onPageChangeCollection={this.props.changePageCollection}
          addCard={this.props.addCard}
          removeCard={this.props.removeCard} />
      </div>
    );
  }
}

export default connect(mapStateToProps, cardManagerActions)(CardManager);
