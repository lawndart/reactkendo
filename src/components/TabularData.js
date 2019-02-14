import React, { Component } from 'react';

import { orderBy, filterBy } from '@progress/kendo-data-query';
import { Grid ,  GridCell, GridColumn as Column, GridDetailRow } from '@progress/kendo-react-grid';

import DetailComponent from './DetailComponent.js';

import product from '../assets/json/products.json';

class TabularData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: product
		}
	}

	render() {

		return (
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
            );
	}

}

export default TabularData;