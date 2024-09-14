import Header from "../../components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCreateBookMutation, useGetBooksQuery } from "../../lib/apiSlice";

import React from "react";


const columns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 200},
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
    align: "center"
  },
  {
    field: "genre",
    headerName: "Genre",
    width: 200,
  },
];

const Inventory = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetBooksQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row._id}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Inventory;