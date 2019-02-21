import React, { Component } from 'react';
import { ComboBox } from '@progress/kendo-react-dropdowns';
import { PanelBar, PanelBarItem, PanelBarUtils } from '@progress/kendo-react-layout';

class LeftNav extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const prodList = this.props.productsList;
		return (	
			<div className="pane-content left-nav">
				<ComboBox
					data={prodList.data}
					filterable={true}
					onFilterChange={this.props.handleFilterChange}
					onChange={this.props.onChange}
					textField="ProductName"
					className="left-nav-search"
					placeholder="Search Shipstuff"
				/>
				<PanelBar>
					<PanelBarItem title={"Awaiting Payment"} className="parent-item">
						<PanelBarItem title={"Stores"}>
							<PanelBarItem title={"Manual Orders"}></PanelBarItem>
							<PanelBarItem title={"Presale Orders"}></PanelBarItem>
						</PanelBarItem>
						<PanelBarItem title={"Views"}>
							<PanelBarItem title={"Save Current View"} disabled={true}></PanelBarItem>
						</PanelBarItem>
					</PanelBarItem>
					<PanelBarItem title={"On Hold"} className="parent-item">
						<PanelBarItem title={"Stores"}>
							<PanelBarItem title={"Manual Orders"}></PanelBarItem>
							<PanelBarItem title={"Presale Orders"}></PanelBarItem>
						</PanelBarItem>
						<PanelBarItem title={"Views"}>
							<PanelBarItem title={"Save Current View"} disabled={true}></PanelBarItem>
						</PanelBarItem>
					</PanelBarItem>
					<PanelBarItem title={"Pending Fulfillment"} className="parent-item">
						<PanelBarItem title={"Stores"}>
							<PanelBarItem title={"Manual Orders"}></PanelBarItem>
							<PanelBarItem title={"Presale Orders"}></PanelBarItem>
						</PanelBarItem>
						<PanelBarItem title={"Views"}>
							<PanelBarItem title={"Save Current View"} disabled={true}></PanelBarItem>
						</PanelBarItem>
					</PanelBarItem>
					<PanelBarItem title={"Shipped"} className="parent-item">
						<PanelBarItem title={"Stores"}>
							<PanelBarItem title={"Manual Orders"}></PanelBarItem>
							<PanelBarItem title={"Presale Orders"}></PanelBarItem>
						</PanelBarItem>
						<PanelBarItem title={"Views"}>
							<PanelBarItem title={"Save Current View"} disabled={true}></PanelBarItem>
						</PanelBarItem>
					</PanelBarItem>
					<PanelBarItem title={"Cancelled"} className="parent-item">
						<PanelBarItem title={"Stores"}>
							<PanelBarItem title={"Manual Orders"}></PanelBarItem>
							<PanelBarItem title={"Presale Orders"}></PanelBarItem>
						</PanelBarItem>
						<PanelBarItem title={"Views"}>
							<PanelBarItem title={"Save Current View"} disabled={true}></PanelBarItem>
						</PanelBarItem>
					</PanelBarItem>
				</PanelBar>
			</div>
		)

	}
	
};

export default LeftNav;