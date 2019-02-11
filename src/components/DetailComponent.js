import React from 'react';
import ReactDOM from 'react-dom';
import { GridDetailRow } from '@progress/kendo-react-grid';

class DetailComponent extends GridDetailRow {
    render() {
        const dataItem = this.props.dataItem;
        return (
            <section className="HEY">
                <p><strong>In Stock:</strong> x units</p>
                <p><strong>On Order:</strong> x units</p>
                <p><strong>Reorder Level:</strong> x units</p>
                <p><strong>Discontinued:</strong> x</p>
                
            </section>
        );
    }
}

export default GridDetailRow;