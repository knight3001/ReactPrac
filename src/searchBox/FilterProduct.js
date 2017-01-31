import React, { Component } from 'react';

class ProductCategoryRow extends Component {
  render() {
    return <tr><th colSpan="2">{this.props.category}</th></tr>;
  }
}

class ProductRow extends Component {
  render() {
    var classname = this.props.product.stocked ?
      "active" : "danger";
    return (
      <tr className={classname}>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends Component {
  render() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach((product) => {
      if (product.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
    return (
      <div className="col-md-8">
        <table className="table table-bordered table-hover">
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

class SearchBar extends Component {
  constructor(props){
      super(props);
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange(){
      this.props.onUserInput(
          this.filterTextInput.value,
          this.inStockOnlyInput.checked
      )
  }

  render() {
    return (
      <div className="col-md-4">
        <form className="form-horizontal">
            <div class="form-group">
                <label for="filterText" className="col-md-5 control-label">Search Keywords</label>
                <div className="col-md-7">
                    <input type="text" id="filterText" className="form-control" placeholder="Search..." value={this.props.filterText} ref={(input) => this.filterTextInput = input } onChange={this.handleChange} />
                </div>
            </div>
            <div class="form-group">
                <label for="inStockOnly" className="col-md-5 control-label">Only show products in stock</label>
                <div className="col-md-1">
                    <input type="checkbox" id="inStockOnly" className="form-control" checked={this.props.inStockOnly} ref={(input) => this.inStockOnlyInput = input} onChange={this.handleChange} />
                </div>
            </div>
        </form>
      </div>
    );
  }
}

class FilterableProductTable extends Component {
  constructor(props){
      super(props);
      this.state = {
          filterText:'',
          inStockOnly:false
      };

      this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(filterText, inStockOnly){
      this.setState({
          filterText:filterText,
          inStockOnly:inStockOnly
      })
  }

  render() {
    return (
      <div className="row">
        <SearchBar
        filterText={this.state.filterText}
        inStockOnly={this.state.inStockOnly} 
        onUserInput={this.handleUserInput}
        />
        <ProductTable 
        products={this.props.products}
        filterText={this.state.filterText}
        inStockOnly={this.state.inStockOnly} 
        />
      </div>
    );
  }
}



 
export default FilterableProductTable; 