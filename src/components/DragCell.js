import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

class DragCell extends React.Component {
    render() {
        return (
            <td onDragOver={() => { DragCell.reorder(this.props.dataItem); }}>
                <span
                    className="k-icon k-i-reorder"
                    draggable="true"
                    style={{ cursor: "move" }}
                    onDragStart={(e) => {
                        DragCell.dragStart(this.props.dataItem);
                        e.dataTransfer.setData("dragging", "");
                    }}
                >
                </span>
            </td>
        );
    }
}

export default DragCell;