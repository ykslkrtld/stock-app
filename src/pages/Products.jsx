import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import * as React from "react";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductModalComp from "../components/ProductModalComp";
import Tooltip from "@mui/material/Tooltip";
import { iconStyle } from "../styles/globalStyles";
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import TableSkeleton, {
  ErrorMessage,
  NoDataMessage,
} from "../components/DataFetchMessages"



const Products = () => {
  const { getDatas, delDatas, emptyDatas } = useStockRequest();
  const { products, error, loading } = useSelector((state) => state.getDatas);


  const columns = [
    { field: 'id', headerName: 'ID', flex:1, headerAlign:"center", align:"center" },
    {
      field: 'category',
      headerName: 'Category',
      flex:1,
      headerAlign:"center", 
      align:"center"
    },
    {
      field: 'brand',
      headerName: 'Brand',
      flex:1,
      headerAlign:"center", 
      align:"center"
    },
    {
      field: 'name',
      headerName: 'Name',
      flex:1,
      headerAlign:"center", 
      align:"center"
    },
    {
      field: 'stock',
      headerName: 'Stock',
      // type: 'number',
      flex:1,
      headerAlign:"center", 
      align:"center"
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      getActions: (props) => [
        <Tooltip title="Delete" arrow>
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => delDatas("products", props.row.id)}
          label="Delete"
          sx={iconStyle}
        />
        </Tooltip>
      ],
    },
  ];
  
  const rows = products.map((product) => ({
    brand: product.brandId ? product.brandId.name : "N/A",
    category: product.categoryId ? product.categoryId.name : "N/A",
    name: product.name,
    stock: product.quantity,
    id: product._id,
  }));

  useEffect(() => {
    getDatas("products");
    getDatas("categories");
    getDatas("brands");
    return () => {emptyDatas()}
  }, []);

  return (
    <>
    <Container sx={{mb:"1.5rem"}} >
      <Typography
        variant="subtitle1"
        fontSize={"1.8rem"}
        color={"darkorange"}
        my={"1rem"}
      >
        Products
      </Typography>
      <ProductModalComp/>
      </Container>
      {loading && <TableSkeleton />}
      {error && <ErrorMessage />}
      {!error && !loading && !products.length && <NoDataMessage />}
      {!error && !loading && products.length > 0 && 
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        pageSizeOptions={[5,10,25,50,100]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
    }
    </>
  )
}

export default Products;