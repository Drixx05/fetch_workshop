import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./App.css";

function App() {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchProducts() {
			try {
			const response = await fetch("https://fakestoreapi.com/products");
			if (!response.ok) {
				throw new Error(`HTTP Error :${response.statusText ? response.statusText + ' - ' :
''}${response.status}`);
			}
			
			const data = await response.json();
			setProducts(data);
		} catch (error) {
			setError("Une erreur est survenue lors de la récupération des produits.")
		} finally {
			setLoading(false);
		}
	}
		fetchProducts();
	}, []);

	const addProduct = async () => {
		try {
		const newProduct = await fetch("https://fakestoreapi.com/products", {
			method: "POST",
			body: JSON.stringify({
				title: "Nouveau Produit",
				price: 77,
				description: "Never gonna give you up",
				image:
					"https://www.icegif.com/wp-content/uploads/2023/01/icegif-162.gif",
				category: "bijoux",
			}),
			headers: {
				"Content-type": "application/json",
			},
		});
		const data = await newProduct.json();
		alert("Le produit avec l'id " + data.id + " a été créé");
		} catch (err) {
			alert("Un problème est survenu lors de la création du produit")
			console.error(error.message);
	};

	const updateProduct = async (id) => {
		try {
		const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title: "Nouveau Produit",
				price: 77,
				description: "Never gonna give you up",
				image:
					"https://www.icegif.com/wp-content/uploads/2023/01/icegif-162.gif",
				category: "bijoux",
			}),
		});
		const data = await response.json();
		alert("Le produit avec l'id " + data.id + " a été modifié");
		} catch (err) {
			alert("Un problème est survenu lors de la modification du produit")
			console.error(error.message);
	};

	const updateProductPrice = async (id) => {
		try {
		const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				price: 77.88,
			}),
		});
		const data = await response.json();
		alert("Le produit avec l'id " + data.id + " a été modifié");
		} catch (err) {
			alert("Un problème est survenu lors de la modification du prix du produit")
			console.error(error.message);
	};

	const deleteProduct = async (id) => {
		try {
		const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
			method: "DELETE",
		});
		const data = await response.json();
		alert("Le produit avec l'id " + data.id + " a été supprimé");
				} catch (err) {
			alert("Un problème est survenu lors de la modification du produit")
			console.error(error.message);
	};

	return (
		<Container>
			<Button onClick={addProduct} className="mb-3">
				Ajouter un produit
			</Button>
			<Row>
				{products.map((product) => (
					<Col key={product.id} md={3} className="gy-3">
						<Card className="h-100">
							<Card.Img variant="top" src={product.image} />
							<Card.Body>
								<Card.Title>{product.title}</Card.Title>
								<Card.Text>{product.description}</Card.Text>
								<Card.Text>{product.price} €</Card.Text>
								<Card.Footer className="row gy-3 mx-0">
									<Button variant="primary" onClick={() => updateProduct(product.id)}>
										Modifier un produit
									</Button>
									<Button variant="warning" onClick={() => updateProductPrice(product.id)}>
										Modifier le prix du produit
									</Button>
									<Button variant="danger" onClick={() => deleteProduct(product.id)}>
										Supprimer le produit
									</Button>
								</Card.Footer>
							</Card.Body>
						</Card>
					</Col>
				))}
			</Row>
		</Container>
	);
}

export default App;
