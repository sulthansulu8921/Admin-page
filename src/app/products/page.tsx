"use client";
import Grid from "@mui/material/Grid";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import AddProductDialog from "../components/AddProductDialog";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [openAdd, setOpenAdd] = useState(false);

  // DELETE POPUP STATE
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetchProducts = async () => {
    const res = await fetch("https://api.escuelajs.co/api/v1/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct: any) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // Trigger delete dialog
  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  // When clicking "Delete" inside popup
  const handleDeleteConfirm = () => {
    if (deleteId !== null) {
      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
    }
    setDeleteOpen(false);
  };

  const handleEdit = (product: any) => {
    console.log("Edit:", product);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Products
        </Typography>

        <Button variant="contained" onClick={() => setOpenAdd(true)}>
          Add Product
        </Button>
      </Box>

      {/* Delete Popup */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Delete Product?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this product?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Product Popup */}
      <AddProductDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={handleAddProduct}
      />

      {loading && <Typography>Loading products...</Typography>}

      {/* Grid */}
      <Grid container spacing={3}>
        {products.map((prod) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={prod.id}>
            <ProductCard
              product={prod}
              onEdit={handleEdit}
              onDelete={confirmDelete}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
