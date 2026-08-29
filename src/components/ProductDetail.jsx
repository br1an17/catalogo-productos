import { Card, CardContent, CardMedia, Typography, Button, Container, Chip, Box } from "@mui/material";

const ProductDetail = ({ product, onBack }) => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Button variant="outlined" onClick={onBack} sx={{ mb: 2 }}>
        ← Volver al catálogo
      </Button>
      <Card>
        <CardMedia
          component="img"
          height="280"
          image={product.thumbnail}
          alt={product.title}
          sx={{ objectFit: "contain", p: 2 }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <Chip label={`Categoría: ${product.category}`} color="primary" variant="outlined" />
            <Chip label={`Rating: ⭐ ${product.rating}`} color="secondary" variant="outlined" />
          </Box>

          <Typography variant="h5" color="success.main" sx={{ mb: 2 }}>
            ${product.price}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductDetail;