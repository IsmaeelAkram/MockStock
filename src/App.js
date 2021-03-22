import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import React from 'react';

async function getStockPrice(ticker) {
	const API_KEY = '32NRSF2AHBQ7OY1G';
	return 152.33;
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			owned_stocks: [
				{ ticker: 'AAPL', buy_price: 140.43, shares: 3 },
				{ ticker: 'GOOGL', buy_price: 313.43, shares: 2 },
			],
		};
	}

	componentDidMount() {
		this.newOwnedStocks = [];
		this.state.owned_stocks.forEach((owned_stock) => {
			getStockPrice(owned_stock.ticker).then((current_price) => {
				this.newOwnedStocks.push({
					ticker: owned_stock.ticker,
					buy_price: owned_stock.buy_price,
					shares: owned_stock.shares,
					current_price: current_price,
				});
				this.setState({ owned_stocks: this.newOwnedStocks });
			});
		});
	}

	render() {
		return (
			<div className="App">
				<h1>Mock Stock</h1>
				<a href="https://buymeacoffee.com/ismaeel">
					<Button variant="primary">Made with ♥️</Button>
				</a>
				<Container className="mt-4">
					<Row>
						<Col>
							<ListGroup>
								{this.state.owned_stocks.map((owned_stock) => {
									return (
										<ListGroup.Item>
											<p className="stock-info mt-3 font-weight-bold">{owned_stock.ticker}</p>{' '}
											<p className="stock-info">
												Portfolio Value:{' '}
												<span className="text-success">
													${owned_stock.current_price * owned_stock.shares}
												</span>
											</p>
											<p className="stock-info">
												Current Price:{' '}
												<span className="text-success">
													{owned_stock.current_price != null
														? '$' + owned_stock.current_price
														: 'Loading...'}
												</span>
											</p>
											<p className="stock-info">
												Buy Price: <span className="text-success">${owned_stock.buy_price}</span>
											</p>
											<p className="mt-1 mb-3 stock-info text-info">{owned_stock.shares} shares</p>
										</ListGroup.Item>
									);
								})}
								{this.state.owned_stocks.length === 0 ? (
									<ListGroup.Item>No stocks.</ListGroup.Item>
								) : (
									<></>
								)}
							</ListGroup>
						</Col>
						<Col></Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default App;
