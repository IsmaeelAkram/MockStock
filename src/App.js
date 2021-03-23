import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import StockList from './components/StockList';
import ls from 'local-storage';
import StockTrader from './components/StockTrader';
import { getStockPrice } from './utils/stockInfo';

class App extends React.Component {
	state = {
		owned_stocks: [{ symbol: 'AAPL', buy_price: 100.0, shares: 2 }] || ls('owned_stocks'),
	};
	// [symbol, buy_price, shares, current_price (const)]

	saveData() {
		ls('owned_stocks', this.state.owned_stocks);
	}

	componentDidMount() {
		this.newOwnedStocks = [];
		this.state.owned_stocks.forEach((owned_stock) => {
			getStockPrice(owned_stock.symbol).then((current_price) => {
				this.newOwnedStocks.push({
					symbol: owned_stock.symbol,
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
							<StockList owned_stocks={this.state.owned_stocks} />
						</Col>
						<Col>
							<StockTrader owned_stocks={this.state.owned_stocks} />
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default App;
