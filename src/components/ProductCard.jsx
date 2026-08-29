import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";

const ProductCard = ({ product, onSelect }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <CardMedia
        component="img"
        height="180"
        image={product.thumbnail}
        alt={product.title}
        sx={{ objectFit: "contain", p: 1 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1, fontWeight: "bold" }}>
          ${product.price}
        </Typography>
      </CardContent>
      <Button 
        variant="contained" 
        size="small" 
        sx={{ m: 2 }} 
        onClick={() => onSelect(product)}
      >
        Ver detalle
      </Button>
    </Card>
  );
};

export default ProductCard;