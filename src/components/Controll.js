import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';
class App extends Component {
    render() {
        return (
            <div className="row mt-15">
                <Search onSearch={this.props.onSearch}></Search>
                <Sort onSort={this.props.onSort}></Sort>
            </div>
        )
    }
}

export default App;
