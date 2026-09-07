import { Grid, Container } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductList = ({ products, onSelect }) => {
  return (
    <Container sx={{ py: 2 }}>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProductCard product={product} onSelect={onSelect} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;