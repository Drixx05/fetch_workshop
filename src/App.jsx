import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

function App() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();
            setProducts(data);
        }
        fetchProducts();
    }, []);
    
    return (
        <Container>
            <div className="card-container">
                {products && products.map((product) => (
                    <Card key={product.id}>
                        <Card.Img variant="top" src={product.image} className="card-img-top" />
                        <Card.Body>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text>${product.price}</Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
}

export default App;