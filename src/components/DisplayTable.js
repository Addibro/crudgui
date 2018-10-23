import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Grid,
  Table,
  TableSelection,
  TableColumnResizing,
  TableHeaderRow,
  Toolbar,
  SearchPanel,
  PagingPanel,
  TableColumnVisibility,
  ColumnChooser
} from "@devexpress/dx-react-grid-material-ui";
import {
  IntegratedPaging,
  PagingState,
  SearchState,
  SelectionState,
  IntegratedFiltering
} from "@devexpress/dx-react-grid";

export default class DisplayTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: [],
      columns: [
        { name: "region", title: "Region" },
        { name: "sector", title: "Sector" },
        { name: "customer", title: "Customer" },
        { name: "product", title: "Product" },
        { name: "amount", title: "Sale Amount" }
      ],
      rows: [
        {
          region: "hello",
          sector: "there",
          customer: "me",
          product: "you",
          amount: "1000"
        }
      ],
      columnWidth: [
        {
          columnName: "region",
          width: 100
        },
        {
          columnName: "sector",
          width: 100
        },
        {
          columnName: "customer",
          width: 100
        },
        {
          columnName: "product",
          width: 100
        },
        {
          columnName: "amount",
          width: 100
        }
      ]
    };
  }

  handleSelectionChange = selection => this.setState({ selection });

  render() {
    const { rows, columns, columnWidth } = this.props;

    return (
      <Paper>
        <Grid rows={rows} columns={columns}>
          <SelectionState onSelectionChange={this.handleSelectionChange} />
          <SearchState />
          <PagingState defaultCurrentPage={0} defaultPageSize={25} />
          <IntegratedFiltering />
          <IntegratedPaging />
          <Table />
          <TableColumnResizing defaultColumnWidths={columnWidth} />
          <TableHeaderRow />
          <TableSelection
            selectByRowClick
            highlightRow
            showSelectionColumn={false}
          />
          <TableColumnVisibility />
          <Toolbar />
          <SearchPanel />
          <PagingPanel pageSizes={[15, 25, 50]} />
          <ColumnChooser />
        </Grid>
      </Paper>
    );
  }
}
