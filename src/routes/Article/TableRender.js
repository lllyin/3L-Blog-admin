import React from 'react';

export default class TableRender extends React.PureComponent {
  render() {
    return (
      <table className="pure-table pure-table-horizontal">
        {this.props.children}
      </table>
    )
  }
}