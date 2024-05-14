import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SaleEditModal = ({open, setOpen, sale}) => {

  let { brandId, productId, quantity, price, id} = sale
  

  const [saleInfo, setSaleInfo] = useState({
    brandId,
    productId,
    quantity,
    price
  });

  useEffect(() => {
    getDatas("sales");
    getDatas("products");
    getDatas("brands");
  }, []);

  const { patchDatas, getDatas } = useStockRequest();

  const { brands, products } = useSelector((state) => state.getDatas);


  const handleChange = (e) => {
    setSaleInfo({ ...saleInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    patchDatas("sales", saleInfo, id);
    setOpen(false)  
};

const handleClose = () => {
    setSaleInfo({
    brandId,
    productId,
    quantity,
    price
  });
  setOpen(false);
};

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={style}
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            gap="1rem"
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Brand</InputLabel>
              <Select
                name="brandId"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={saleInfo.brandId}
                label="Brand"
                onChange={handleChange}
                required
              >
                {brands?.map((brand) => (
                  <MenuItem key={brand._id} value={brand._id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Product</InputLabel>
              <Select
                name="productId"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={saleInfo.productId}
                label="Product"
                onChange={handleChange}
                required
              >
                {products?.map((product) => (
                  <MenuItem key={product._id} value={product._id}>
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              id="quantity"
              name="quantity"
              label="Quantity"
              variant="outlined"
              value={saleInfo.quantity}
              onChange={handleChange}
              required
            />
            <TextField
              id="price"
              name="price"
              label="Price"
              variant="outlined"
              value={saleInfo.price}
              onChange={handleChange}
              required
            />
            <Button variant="contained" type="submit">
              UPDATE SALE
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default SaleEditModal