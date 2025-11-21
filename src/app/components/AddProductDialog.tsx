"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack
} from "@mui/material";
import { useState } from "react";

export default function AddProductDialog({ open, onClose, onAdd }: any) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = () => {
    if (!title || !price || !image) return alert("All fields required!");

    onAdd({
      id: Date.now(),
      title,
      price,
      images: [image],
    });

    onClose();
    setTitle("");
    setPrice("");
    setImage("");
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Add New Product</DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Product Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Price"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <TextField
            label="Image URL"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAdd}>
          Add Product
        </Button>
      </DialogActions>
    </Dialog>
  );
}
