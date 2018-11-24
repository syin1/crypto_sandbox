import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Menu, Table } from 'semantic-ui-react/dist/commonjs';

const preventDefault = e => e.preventDefault();

export default class CoinTablePagination extends React.Component {
  constructor() {
    super();
    this.onChangePage = this.onChangePage.bind(this);
    this.begin = this.begin.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.end = this.end.bind(this);
  }

  begin() {
    if (this.props.currentPage !== 1) {
      this.props.onChangePage(1);
    }
  }

  prev() {
    if (this.props.currentPage !== 1) {
      this.props.onChangePage(this.props.currentPage - 1);
    }
  }

  next() {
    if (this.props.currentPage !== this.props.totalPages - 1) {
      this.props.onChangePage(this.props.currentPage + 1);
    }
  }

  end() {
    if (this.props.currentPage !== this.props.totalPages - 1) {
      this.props.onChangePage(this.props.totalPages - 1);
    }
  }

  onChangePage(page) {
    this.props.onChangePage(page);
  }

  render() {
    const { totalPages, showPages, currentPage } = this.props;

    if (totalPages === 1) {
      return null;
    }

    let diff = Math.floor(showPages / 2),
      start = Math.max(currentPage - diff, 1),
      end = Math.min(start + showPages, totalPages);

    if (totalPages >= showPages && end >= totalPages) {
      start = totalPages - showPages;
    }

    let buttons = [],
      isCurrent,
      btnEvent;

    for (let i = start; i <= end; i++) {
      isCurrent = currentPage === i;
      // If the button is for the current page then disable the event.
      if (!isCurrent) {
        btnEvent = this.onChangePage.bind(this, i);
      } else {
        btnEvent = preventDefault;
      }
      buttons.push(
        <Menu.Item key={i} active={isCurrent} as="a" onClick={btnEvent}>
          {i}
        </Menu.Item>
      );
    }

    return (
      <Table.Row>
        <Table.HeaderCell colSpan="8">
          Total pages: {this.props.totalPages}
          <Menu floated="right" pagination borderless>
            <Menu.Item
              as="a"
              icon
              onClick={this.begin}
              disabled={this.props.currentPage === 1}
            >
              <Icon name="angle double left" />
            </Menu.Item>
            <Menu.Item
              as="a"
              icon
              onClick={this.prev}
              disabled={this.props.currentPage === 1}
            >
              <Icon name="angle left" />
            </Menu.Item>

            {buttons}

            <Menu.Item
              as="a"
              icon
              onClick={this.next}
              disabled={this.props.currentPage === this.props.totalPages}
            >
              <Icon name="angle right" />
            </Menu.Item>
            <Menu.Item
              as="a"
              icon
              onClick={this.end}
              disabled={this.props.currentPage === this.props.totalPages}
            >
              <Icon name="angle double right" />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    );
  }
}

CoinTablePagination.defaultProps = {
  showPages: 5
};

CoinTablePagination.propTypes = {
  onChangePage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  showPages: PropTypes.number
};
