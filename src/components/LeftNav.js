import React, { Component } from 'react';
import { AutoComplete, MultiSelect, ComboBox } from '@progress/kendo-react-dropdowns';

class LeftNav extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const prodList = this.props.productsList;
		return (	
			<div className="pane-content">
				<ComboBox
					data={prodList.data}
					filterable={true}
					onFilterChange={this.props.handleFilterChange}
					onChange={this.props.onChange}
					textField="ProductName"
				/>
				<h3>Inner splitter / left pane</h3>
				<p>Resizable and collapsible.</p>
			</div>
		)

	}
	
};

export default LeftNav;