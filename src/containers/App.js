import React, { Component } from 'react';
import { Splitter } from '@progress/kendo-react-layout';
import { AutoComplete, MultiSelect, ComboBox } from '@progress/kendo-react-dropdowns';
import { orderBy, filterBy } from '@progress/kendo-data-query';
import { Grid , GridColumn as Column, GridDetailRow } from '@progress/kendo-react-grid';
import { Window } from '@progress/kendo-react-dialogs';
import MyCommandCell from '../components/command-cell.js';

// import DetailComponent from '../components/DetailComponent.js';
import '@progress/kendo-theme-default/dist/all.css';
import '../assets/css/App.css';
import product from '../assets/json/products.json';

class DetailComponent extends GridDetailRow {
  render() {
    const dataItem = this.props.dataItem;
    return (
      <section>
      <p><strong>In Stock:</strong> {dataItem.UnitsInStock} units</p>
      <p><strong>On Order:</strong> {dataItem.UnitsOnOrder} units</p>
      <p><strong>Reorder Level:</strong> {dataItem.ReorderLevel} units</p>
      <p><strong>Discontinued:</strong> {dataItem.Discontinued}</p>
      <p><strong>Category:</strong> {dataItem.Category.CategoryName} - {dataItem.Category.Description}</p>   
      </section>
      );
  }
}

class App extends Component {
  
  CommandCell;

  lastSelectedIndex = 0;
  
  constructor(props) {
    super(props)

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
    
     console.log(event.filter)
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
    console.log("Sdfsdf");
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <div className="App"> 
        <h1>Kendo test</h1>  
        
        {this.state.visible &&
            <Window title={"Status"} onClose={this.toggleDialog} initialHeight={350}>
              <form className="k-form">
                <fieldset>
                  <legend>User Details</legend>

                  <label className="k-form-field">
                      <span>First Name</span>
                      <input className="k-textbox" placeholder="Your Name" />
                  </label>
                  <label className="k-form-field">
                      <span>Last Name</span>
                      <input className="k-textbox" placeholder="Your Last Name" />
                  </label>
                </fieldset>

                <div className="text-right">
                  <button type="button" className="k-button" onClick={this.toggleDialog}>Cancel</button>
                  <button type="button" className="k-button k-primary" onClick={this.toggleDialog}>Submit</button>
                </div>
              </form>
            </Window>
          }

        <Splitter
          panes={this.state.panes}
          onLayoutChange={this.onLayoutChange}
        >
          <div className="pane-content">
            <ComboBox
                data={product}
                filterable={true}
                onFilterChange={this.handleFilterChange}
                onChange={this.onChange}
                textField="ProductName"
            />
            <h3>Inner splitter / left pane</h3>
            <p>Resizable and collapsible.</p>
          </div>
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
            <Grid
              data={orderBy(this.state.data.slice(this.state.skip, this.state.take + this.state.skip), this.state.sort)}
              style={{maxHeight: '700px'}}
              filterable={true}
              filter={this.state.filter}
              onFilterChange={this.handleFilterChange}
              editField="inEdit"
              onItemChange={this.itemChange}
              resizable={true}
              reorderable={true}
              pageable={true}
              skip={this.state.skip}
              take={this.state.take}
              total={this.state.total}
              onPageChange={this.pageChange}
              sortable
              sort={this.state.sort}
              onSortChange={(e) => {
                this.setState({
                  sort: e.sort
                });
              }}
              detail={DetailComponent}
              expandField="expanded"
              onExpandChange={this.expandChange}
              selectedField="selected"
              onSelectionChange={this.selectionChange}
              onHeaderSelectionChange={this.headerSelectionChange}
              onRowClick={this.rowClick}
              >
              <Column
                field="selected"
                width="50px"
                headerSelectionValue={
                    this.state.data.findIndex(dataItem => dataItem.selected === false) === -1
                }
                filterable={false} 
              />
              <Column field="ProductID" title="Product ID" filter="numeric"/>
              <Column field="ProductName" title="Product Name" />
              <Column field="UnitsInStock" title="Number in stock" filter="numeric"/>
              <Column field="UnitsOnOrder" title="Number on order" filter="numeric"/>
              <Column cell={this.CommandCell} width="180px" filterable={false}/>
            </Grid>
          </section>
        </Splitter>
        
      </div> 
    );
  }
}

export default App;
