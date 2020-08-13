import React, { Component } from 'react';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            keySearch:'',
        }
    }
    onChange=(event)=>{
        var target=event.target;
        var name=target.name;
        var value=target.value;       
        this.setState({
            [name]:value
        });
    }
    onSearch=()=>{
        this.props.onSearch(this.state.keySearch);
    }
    render() {
        var {keySearch}=this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input type="text" name="keySearch" className="form-control" placeholder="Nhập từ khóa..." value={keySearch} onChange={this.onChange}/>
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button"  onClick={this.onSearch}>
                            <span className="fa fa-search mr-5"></span>Tìm
                            </button>
                    </span>
                </div>
            </div>
        )
    }
}

export default Search;
