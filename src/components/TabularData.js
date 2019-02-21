import React, { Component } from 'react';

import { orderBy, filterBy } from '@progress/kendo-data-query';
import { Grid ,  GridCell, GridColumn as Column, GridDetailRow } from '@progress/kendo-react-grid';

import DetailComponent from './DetailComponent.js';


class TabularData extends Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		const prodList = this.props.productsList;
		
		return(

			<Grid
				data={orderBy(prodList.data.slice(prodList.skip, prodList.take + prodList.skip), prodList.sort)}
				style={{maxHeight: '730px'}}
				filterable={true}
				filter={prodList.filter}
				onFilterChange={this.props.handleFilterChange}
				editField="inEdit"
              	onItemChange={this.props.itemChange}
				resizable={true}
				reorderable={true}
				pageable={{ pageSizes: true }}
				skip={prodList.skip}
				take={prodList.take}
				onPageChange={this.props.pageChange}
				total={prodList.total}
				sortable
				sort={prodList.sort}
				onSortChange = {this.props.sortChange}
				detail={DetailComponent}
				expandField="expanded"
				onExpandChange={this.props.expandChange}
				onSelectionChange={this.props.selectionChange}
              	onHeaderSelectionChange={this.props.headerSelectionChange}
              	onRowClick={this.props.rowClick}
              	selectedField="selected"
              	onSelectionChange={this.props.selectionChange}
				onHeaderSelectionChange={this.props.headerSelectionChange}
				onRowClick={this.props.rowClick}
			>
				<Column
					field="selected"
					width="50px"
					headerSelectionValue={
						prodList.data.findIndex(dataItem => dataItem.selected === false) === -1
					}
					filterable={false} 
				/>
				<Column field="ProductID" title="Product ID" filter="numeric"/>
				<Column field="ProductName" title="Product Name" />
				<Column field="UnitsInStock" title="Number in stock" filter="numeric"/>
				<Column field="UnitsOnOrder" title="Number on order" filter="numeric"/>
				<Column cell={this.props.CommandCell} width="180px" filterable={false}/>
            </Grid>
		);

	}

}

export default TabularData;