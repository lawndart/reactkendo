import React, { Component } from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { filterBy } from '@progress/kendo-data-query';
import { Grid , GridColumn as Column } from '@progress/kendo-react-grid';
import MyCommandCell from '../components/command-cell.js';
import '@progress/kendo-theme-default/dist/all.css';
import '../assets/css/App.css';

// import nutrition from './nutrition.json';
import product from '../assets/json/products.json';

class App extends Component {

  CommandCell;
  
  constructor(props) {
    super(props)
    
    const initalFilter = {
      logic: 'and',
      filters: [{
        field: 'ProductName', 
        operator: 'contains',
        value: ''
      }]
    }

    this.state = {
      data: this.getProducts(initalFilter),
      filter: initalFilter,
      habitId: 0,
      habitName: '',
      habit: '',
      habitIteration: 0,
      habits: [],
      habitOptions: [
        "Drink water",
        "Eat food",
        "Do stuff"
      ]
    };

    this.enterInsert = this.enterInsert.bind(this);
    this.itemChange = this.itemChange.bind(this);

    const enterEdit = this.enterEdit.bind(this);
    const save = this.save.bind(this);
    const cancel = this.cancel.bind(this);
    const remove = this.remove.bind(this);
    this.CommandCell = MyCommandCell(enterEdit,remove,save,cancel, "inEdit");
  }

  handleNameChange = (event) => {
    this.setState({ habitName: event.target.value });
  }

  handleIterationChange = (event) => {
    this.setState({ habitIteration: event.target.value });
  }

  handleAddHabit = (event) => {
    this.setState({
     habits: this.state.habits.concat([{
      key: this.state.habitId,
      name: this.state.habitName,
      iterations: this.state.habitIteration
     }]),
     habitId: this.state.habitId + 1 
    });
  }

  
  handleFilterChange = (event) => {
    this.setState({
      data: this.getProducts(event.filter),
      filter: event.filter
    });
  }

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

  render() {
    return (
      <div className="App"> 
        <h1>Kendo test</h1>
        <section className="healthy-habits">
          <ul>
            {this.state.habits.map((habit => [
              <li key={habit.habitId}>
                <h3>{habit.name}</h3>
                <div className="iterations-area">
                  {[...Array(habit.iterations)].map((iteration,index) => {
                    return <input key={index} type="radio"/>
                  })}
                </div>
                </li>
              ]))
            }
          </ul>
        </section>
        <section className="add-habits">
          <DropDownList
            data={this.state.habitOptions}
            value={this.state.habitName}
            onChange={this.handleNameChange}
            />
            <NumericTextBox
              format='0'
              min={0}
              value={this.state.habitIteration}
            onChange={this.handleIterationChange}
            />
            <Button primary={true} onClick={this.handleAddHabit}> Add Habit</Button>
        </section>   
        <section className="nutrition-grid">
          <Grid
            data={this.state.data}
            style={{maxHeight: '500px'}}
            filterable={true}
            filter={this.state.filter}
            onFilterChange={this.handleFilterChange}
            editField="inEdit"
            onItemChange={this.itemChange}
            >
            <Column field="ProductID" title="Product ID" filter="numeric"/>
            <Column field="ProductName" title="Product Name" />
            <Column field="UnitsInStock" title="Number in stock" filter="numeric"/>
            <Column field="UnitsOnOrder" title="Number on order" filter="numeric"/>
            <Column cell={this.CommandCell} width="180px" filterable={false}/>
          </Grid>
        </section>
      </div>  
    );
  }
}

export default App;
