import React, { Component } from 'react';

import { Splitter } from '@progress/kendo-react-layout';
import { AutoComplete, MultiSelect, ComboBox } from '@progress/kendo-react-dropdowns';
import { orderBy, filterBy } from '@progress/kendo-data-query';
import { Grid , GridColumn as Column, GridDetailRow } from '@progress/kendo-react-grid';
import { Window } from '@progress/kendo-react-dialogs';

import MyCommandCell from '../components/command-cell.js';
import TabularData from '../components/TabularData.js';
import LeftNav from '../components/LeftNav.js';

import '@progress/kendo-theme-default/dist/all.css';
import '../assets/css/App.css';

import product from '../assets/json/products.json';

class App extends Component {
  
  CommandCell;

  lastSelectedIndex = 0;
  
  constructor() {
    super();

    // Set our inital view filter (how the table renders first go)
    const initalFilter = {
      logic: 'and',
      filters: [{
        field: 'ProductName', 
        operator: 'contains',
        value: ''
      }]
    }
    const enterEdit = this.enterEdit.bind(this);
    const save = this.save.bind(this);
    const cancel = this.cancel.bind(this);
    const remove = this.remove.bind(this);
    const toggleDialog = this.toggleDialog.bind(this);

    this.enterInsert = this.enterInsert.bind(this);
    
    this.itemChange = this.itemChange.bind(this);

    this.CommandCell = MyCommandCell(enterEdit,remove,save,cancel, "inEdit");

    this.state = {
      data: this.getProducts(initalFilter),
      filter: initalFilter,
      searchData: product,
      selectedData: product.map(dataItem => Object.assign({ selected: false }, dataItem)),
      skip: 0,
      take: 20,
      sort: [{
        field: 'ProductID',
        dir: 'asc'
      }],
      panes: [
        {size: '20%', min: '20px', collapsible: true},
        {}
      ],
      search: '',
      suggest: '',
      windowVisible: true,
      value: [],
      total: product.length
    };

  }
  
  // Basic table filter function 
  handleFilterChange = (event) => {
    this.setState({
      data: this.getProducts(event.filter),
      filter: event.filter
    });

  }
  
  onChange = (event) => { 

    // Get the returned object
    let selectedValue = event.target.value; 

    // If the search is cleared set 
    // the data back to the main products
    if(event.target.value === null) {
      
      this.setState({
        data: product
      });
    
    } else {
      // Other wise we have to wrap 
      // the returned object as an array to pass 
      // through to the filter
      this.setState({
        data: [selectedValue]
      }); 
    
    }
    
  }

  // Multi select handler to update our table
  handleChange = (event) => {
    
    this.setState({
      data: event.target.value,
      value: event.target.value,
      total: event.target.value.length
    });

    // if the select is cleared bring it back to 
    // the basic product list
    if(event.target.value.length === 0) {
      this.setState({
        data: this.getProducts(event.filter),
        total: product.length
      });
    }

  }

  handleSearchChange = (event) => {
    
    this.setState({
      data: this.getProducts(event.filter),
      filter: event.filter,
      search: event.target.value,
      suggest: event.suggestion ? event.suggestion.value : ''
    });
    
  }

  // Used for passing our filter state 
  getProducts = (filter) => filterBy(product, filter);

  enterEdit(dataItem) {
    
    this.update(this.state.data, dataItem).inEdit = true;
    
    this.setState({
        data: this.state.data.slice()
    });
  
  }

  enterInsert() {
    
    const dataItem = { inEdit: true, Discontinued: false };
    const newproducts = this.state.data.slice();
    
    newproducts.unshift(dataItem);
    
    this.update(newproducts, dataItem);
    
    this.setState({
        data: newproducts
    });
  
  }

  save(dataItem) {
    
    dataItem.inEdit = undefined;
    
    dataItem.ProductID = this.update(product, dataItem).ProductID;
    
    this.setState({
      data: this.state.data.slice()
    });
  
  }

  cancel(dataItem) {
    
    if (dataItem.ProductID) {
        
      let originalItem = product.find(p => p.ProductID === dataItem.ProductID);
       
      this.update(this.state.data, originalItem);
    
    } else {
     
      this.update(this.state.data, dataItem, !dataItem.ProductID);
    
    }
    
    this.setState({
      data: this.state.data.slice() 
    });
  
  }

  remove(dataItem) {
    
    dataItem.inEdit = undefined;
    
    this.update(this.state.data, dataItem, true);
    
    this.update(product, dataItem, true);
    
    this.setState({
      data: this.state.data.slice() 
    });
  
  }

  update(data, item, remove) {
    
    let updated;
    
    let index = data.findIndex(p => p === item || item.ProductID && p.ProductID === item.ProductID);
    
    if (index >= 0) {
      
      updated = Object.assign({}, item);
      
      data[index] = updated;
    
    } else {
        
        let id = 1;
        
        data.forEach(p => { id = Math.max(p.ProductID + 1, id); });
        
        updated = Object.assign({}, item, { ProductID: id });
        
        data.unshift(updated);
        
        index = 0;
    }
    
    if (remove) {
      
      data = data.splice(index, 1);
    
    }
    
    return data[index];
  
  }

  itemChange(event) {
    const value = event.value;
    const name = event.field;
    
    if (!name) {
      return;
    }
    
    const updatedData = this.state.data.slice();
    const item = this.update(updatedData, event.dataItem);
    
    item[name] = value;
    
    this.setState({
      data: updatedData
    });
  
  }

  pageChange = (event) => {
    this.setState({
      skip: event.page.skip,
      take: event.page.take
    });
  
  }

  expandChange = (event) => {
    
    event.dataItem.expanded = !event.dataItem.expanded;
    
    this.forceUpdate();
  
  }

  onLayoutChange = (updatedState) => {
    
    this.setState({
      panes: updatedState
    });
  
  }

  selectionChange = (event) => {
    
    event.dataItem.selected = !event.dataItem.selected;
    
    this.forceUpdate();
  
  }

  rowClick = (event) => {
    
    let last = this.lastSelectedIndex;
    const current = this.state.data.findIndex(dataItem => dataItem === event.dataItem);

    if (!event.nativeEvent.shiftKey) {
      this.lastSelectedIndex = last = current;
    }

    if (!event.nativeEvent.ctrlKey) {
      this.state.data.forEach(item => item.selected = false);
    }
    
    const select = !event.dataItem.selected;
    
    for (let i = Math.min(last, current); i <= Math.max(last, current); i++) {
      this.state.data[i].selected = select;
    }
    
    this.forceUpdate();
  
  }

  headerSelectionChange = (event) => {
    
    const checked = event.syntheticEvent.target.checked;
    
    this.state.data.forEach(item => item.selected = checked);
    
    this.forceUpdate();
  
  }

  toggleDialog = (event) => {
    this.setState({
      visible: !this.state.visible
    });
  }

  sortChange = (event) => {
    this.setState({
      sort: event.sort
    });
  }

  render() {
    const productsList = this.state;

    return (
      <div className="App"> 
        <h1>Kendo test</h1> 

        <Splitter
          panes={this.state.panes}
          onLayoutChange={this.onLayoutChange}
        >
          <LeftNav 
            productsList={productsList}
            handleFilterChange={this.handleFilterChange.bind(this)}
            onChange={this.onChange.bind(this)} 
          />
          <section className="nutrition-grid pane-content">
            <div>
              <label>Filter by Product Name</label>
              <MultiSelect
                data={product}
                value={this.state.value}
                onChange={this.handleChange}
                textField="ProductName"
              />
            </div>
            <TabularData 
              productsList={productsList} 
              pageChange={this.pageChange.bind(this)} 
              handleFilterChange={this.handleFilterChange.bind(this)}
              itemChange={this.itemChange.bind(this)}
              expandChange={this.expandChange.bind(this)}
              selectionChange={this.selectionChange.bind(this)}
              headerSelectionChange={this.headerSelectionChange.bind(this)}
              rowClick={this.rowClick.bind(this)}
              enterEdit = {this.enterEdit.bind(this)}
              save = {this.save.bind(this)}
              cancel = {this.cancel.bind(this)}
              remove = {this.remove.bind(this)}
              toggleDialog = {this.toggleDialog.bind(this)}
              enterInsert = {this.enterInsert.bind(this)}
              itemChange = {this.itemChange.bind(this)}
              CommandCell = {this.CommandCell.bind(this)}
              sortChange={this.sortChange.bind(this)}
            />
          </section>
        </Splitter>
        
      </div> 
    );
  }
}

export default App;
