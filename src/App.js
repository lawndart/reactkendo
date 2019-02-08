import React, { Component } from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { NumericTextBox } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { filterBy } from '@progress/kendo-data-query';
import { Grid , GridColumn as Column } from '@progress/kendo-react-grid';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';

// import nutrition from './nutrition.json';
import product from './products.json';

class App extends Component {
  constructor(props) {
    super(props)
    const initalFilter = {
      logic: 'and',
      fliters: [{
        field: 'ProductName', 
        operator: 'contains',
        value: 'Chai'
      }]
    }
    this.state = {
      data: product,
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
    }
  };

  handleNameChange = (event) => {
    this.setState({ habitName: event.target.value })
  }

  handleIterationChange = (event) => {
    this.setState({ habitIteration: event.target.value })
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
            style={{maxHeight:"500px"}}
          >
            <Column field="ProductID" title="Product ID" />
            <Column field="ProductName" title="Product Name" />
            <Column field="UnitsInStock" title="Number in stock" />
            <Column field="UnitsOnOrder" title="Number on order" />
          </Grid>
        </section>
      </div>  
    );
  }
}

export default App;
