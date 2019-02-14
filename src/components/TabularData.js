import React, { Component } from 'react';

import { orderBy, filterBy } from '@progress/kendo-data-query';
import { Grid ,  GridCell, GridColumn as Column, GridDetailRow } from '@progress/kendo-react-grid';

import DetailComponent from './DetailComponent.js';

import product from '../assets/json/products.json';

class TabularData extends Component {

	constructor(props) {
		super(props);

		// Set our inital view filter (how the table renders first go)
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
      		skip: 0,
			take: 20,
			sort: [{
				field: 'ProductID',
				dir: 'asc'
			}],
			total: product.length
		}
	}

	// Used for passing our filter state 
	getProducts = (filter) => filterBy(product, filter);

	render() {

		return(

			<Grid 
				data={this.state.data}
				style={{maxHeight: '700px'}}
	          	filterable={true}
	          	filter={this.state.filter}
	          	onFilterChange={this.props.handleFilterChange}
	          	resizable={true}
              	reorderable={true}
              	pageable={true}
              	skip={this.state.skip}
              	take={this.state.take}
              	onPageChange={this.pageChange}
				sortable
				sort={this.state.sort}
				onSortChange={(e) => {
					this.setState({
					  sort: e.sort
					});
				}}
				total={this.state.total}
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
            </Grid>
		);
	}

}

export default TabularData;