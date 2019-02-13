import React from 'react';
import ReactDOM from 'react-dom';
import { GridDetailRow } from '@progress/kendo-react-grid';

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

export default DetailComponent;