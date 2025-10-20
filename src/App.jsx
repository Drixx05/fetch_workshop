import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./App.css";

function App() {
	const [products, setProducts] = useState([]);

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
			<Row>
				{products.map((product) => (
					<Col key={product.id} md={3} className="gy-3">
						<Card className="h-100">
							<Card.Img variant="top" src={product.image} />
							<Card.Body>
								<Card.Title>{product.title}</Card.Title>
								<Card.Text>{product.description}</Card.Text>
								<Card.Text>{product.price} €</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default App;
