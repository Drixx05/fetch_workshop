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
          <Row className="justify-content-md-center">
                {products.map((product) => (
                    <Col>
                    <Card key={product.id}>
                        <Card.Img variant="top" src={product.image} />
                        <Card.Body>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text>${product.price}</Card.Text>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
                </Row>
        </Container>
    );
}

export default App;