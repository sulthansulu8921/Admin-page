

import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

export default function ProductCard({ product, onEdit, onDelete }: any) {
return (
<Card sx={{ width: 280, borderRadius: 3, boxShadow: 3 }}>
<CardMedia
component="img"
height="200"
image={product.images?.[0] || "/placeholder.png"}
alt={product.title}
sx={{ objectFit: "cover" }}
/>
<CardContent>
<Typography variant="h6" noWrap>{product.title}</Typography>
<Typography color="text.secondary">${product.price}</Typography>
</CardContent>
<CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
<Button size="small" variant="outlined" onClick={() => onEdit(product)}>Edit</Button>
<Button size="small" color="error" variant="contained" onClick={() => onDelete(product.id)}>Delete</Button>
</CardActions>
</Card>
);
}
