import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import React from 'react';
import StockList from './components/StockList';
import ls from 'local-storage';
import StockTrader from './components/StockTrader';

async function getStockPrice(ticker) {
	const API_KEY = '32NRSF2AHBQ7OY1G';
	return 152.33;
}

class App extends React.Component {
	state = {
		owned_stocks: [] || ls('owned_stocks'),
	};

	saveData() {
		ls('owned_stocks', this.state.owned_stocks);
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
