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
			<div className="pane-content">
				<ComboBox
					data={prodList.data}
					filterable={true}
					onFilterChange={this.props.handleFilterChange}
					onChange={this.props.onChange}
					textField="ProductName"
				/>
				<PanelBar expandMode={"single"}>
					<PanelBarItem title={"Awaiting Payment"}>
						<PanelBarItem title={"Stores"}>
							<PanelBarItem title={"Manual Orders"}></PanelBarItem>
							<PanelBarItem title={"Presale Orders"}></PanelBarItem>
						</PanelBarItem>
						<PanelBarItem title={"Views"}>
							<PanelBarItem title={"Save Current View"} disabled={true}></PanelBarItem>
						</PanelBarItem>
					</PanelBarItem>
					<PanelBarItem title={"On Hold"}>
						<PanelBarItem title={"Stores"}>
							<PanelBarItem title={"Manual Orders"}></PanelBarItem>
							<PanelBarItem title={"Presale Orders"}></PanelBarItem>
						</PanelBarItem>
						<PanelBarItem title={"Views"}>
							<PanelBarItem title={"Save Current View"} disabled={true}></PanelBarItem>
						</PanelBarItem>
					</PanelBarItem>
					<PanelBarItem title={"Pending Fulfillment"}>
						<PanelBarItem title={"Stores"}>
							<PanelBarItem title={"Manual Orders"}></PanelBarItem>
							<PanelBarItem title={"Presale Orders"}></PanelBarItem>
						</PanelBarItem>
						<PanelBarItem title={"Views"}>
							<PanelBarItem title={"Save Current View"} disabled={true}></PanelBarItem>
						</PanelBarItem>
					</PanelBarItem>
					<PanelBarItem title={"Shipped"}>
						<PanelBarItem title={"Stores"}>
							<PanelBarItem title={"Manual Orders"}></PanelBarItem>
							<PanelBarItem title={"Presale Orders"}></PanelBarItem>
						</PanelBarItem>
						<PanelBarItem title={"Views"}>
							<PanelBarItem title={"Save Current View"} disabled={true}></PanelBarItem>
						</PanelBarItem>
					</PanelBarItem>
					<PanelBarItem title={"Cancelled"}>
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