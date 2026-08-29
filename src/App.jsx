import { useState, useEffect } from "react";
import { 
  Container, 
  TextField, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert, 
  Button, 
  CssBaseline, 
  ThemeProvider, 
  createTheme 
} from "@mui/material";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";

function App() {
  const URL = "https://dummyjson.com/products?limit=12";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      ...(darkMode && {
        background: {
          default: "#121212",
          paper: "#1e1e1e",
        },
      }),
    },
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("No se pudieron cargar los productos");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <Container sx={{ py: 4, minHeight: "100vh" }}>
        {selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)} 
          />
        ) : (
          <>
            <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
              Catálogo de Productos
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 4, alignItems: "center" }}>
              <TextField
                fullWidth
                label="Buscar por nombre..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
               onClick={() => setDarkMode(!darkMode)}
                color="inherit"
                sx={{ 
                  backgroundColor: darkMode ? "#9ddcda" : "#221f1f",
                  width: "56px", 
                  height: "56px", 
                  fontSize: "1.8rem",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2
                }}
              >
                {darkMode ? "☀️" : "🌙"}
              </Button>
            </Box>

            {searchTerm.length >= 3 && filteredProducts.length === 0 ? (
              <Alert severity="warning" sx={{ mt: 2 }}>
                No se encuentra el producto "{searchTerm}".
              </Alert>
            ) : (
              <ProductList
                products={filteredProducts}
                onSelect={(prod) => setSelectedProduct(prod)}
              />
            )}
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;