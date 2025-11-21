"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>({
    id: undefined,
    name: "",
    image: "",
  });

  // DELETE confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<any>(null);

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/categories");
      const data = await res.json();
      setCategories(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = () => {
    setCurrentCategory({ id: undefined, name: "", image: "" });
    setIsEdit(false);
    setOpenDialog(true);
  };

  const handleEdit = (category: any) => {
    setCurrentCategory(category);
    setIsEdit(true);
    setOpenDialog(true);
  };

  // -------------------------------
  // DELETE - open confirmation dialog
  // -------------------------------
  const handleDelete = (category: any) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  // -------------------------------
  // DELETE (API request)
  // -------------------------------
  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await fetch(
        `https://api.escuelajs.co/api/v1/categories/${categoryToDelete.id}`,
        { method: "DELETE" }
      );

      setDeleteDialogOpen(false);
      fetchCategories(); // refresh list
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleSave = async () => {
    const body = {
      name: currentCategory.name,
      image: currentCategory.image,
    };

    if (isEdit && currentCategory.id) {
      await fetch(`https://api.escuelajs.co/api/v1/categories/${currentCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("https://api.escuelajs.co/api/v1/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    setOpenDialog(false);
    fetchCategories();
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Categories</Typography>
        <Button variant="contained" onClick={handleAdd}>
          Add Category
        </Button>
      </Box>

      {loading ? (
        <Typography>Loading categories...</Typography>
      ) : (
        <Grid container spacing={3}>
          {categories.map((c) => (
            <Grid item xs={12} sm={6} md={4} key={c.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={c.image || "https://via.placeholder.com/150"}
                  alt={c.name}
                />
                <CardContent>
                  <Typography variant="h6">{c.name}</Typography>
                </CardContent>

                <Box sx={{ display: "flex", gap: 1, p: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(c)}
                  >
                    Delete
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={currentCategory.name}
            onChange={(e) =>
              setCurrentCategory({ ...currentCategory, name: e.target.value })
            }
          />
          <TextField
            label="Image URL"
            fullWidth
            margin="dense"
            value={currentCategory.image}
            onChange={(e) =>
              setCurrentCategory({ ...currentCategory, image: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {isEdit ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          Are you sure you want to delete{" "}
          <b>{categoryToDelete?.name}</b>?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
