import { Card, CardContent, Typography, Button } from "@mui/material";

export default function CategoryCard({ category, onAddProduct, onRemoveProduct }: any) {
return (
<Card sx={{ width: 260, borderRadius: 3, boxShadow: 3 }}>
<CardContent>
<Typography variant="h6" gutterBottom>
{category.name}
</Typography>

<Button
fullWidth
variant="contained"
sx={{ mb: 1 }}
onClick={() => onAddProduct(category.id)}
>
Add Product
</Button>

<Button
fullWidth
variant="outlined"
color="error"
onClick={() => onRemoveProduct(category.id)}
>
Remove Product
</Button>
</CardContent>
</Card>
);
}