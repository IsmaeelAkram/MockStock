import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import React from 'react';
import StockList from './components/StockList';
import ls from 'local-storage';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			owned_stocks: [] || ls('owned_stocks'),
			cash: 0 || ls('cash'),
			buySymbol: '',
			buyShares: 0,
		};
		// [symbol, buy_price, shares, current_price (const)]

		this.handleBuy = this.handleBuy.bind(this);
		this.handleSell = this.handleSell.bind(this);
		this.saveData = this.saveData.bind(this);
		this.refreshCurrentPrices = this.refreshCurrentPrices.bind(this);
		this.handleBuySharesChange = this.handleBuySharesChange.bind(this);
		this.handleBuySymbolChange = this.handleBuySymbolChange.bind(this);
	}

	saveData() {
		ls('owned_stocks', this.state.owned_stocks);
		ls('cash', this.state.cash);
	}

	handleBuy(e) {
		e.preventDefault();
		let symbol = this.state.buySymbol;
		let shares = this.state.buyShares;
		let stockFound = false;
		this.state.owned_stocks.forEach((stock) => {
			if (stock.symbol == symbol) {
				stockFound = true;
			}
		});
		if (stockFound) {
			this.state.owned_stocks.forEach((stock) => {
				if (stock.symbol == symbol) {
					stock.shares += Number(shares);
				}
			});
		} else {
			this.setState({
				owned_stocks: [
					...this.state.owned_stocks,
					{ symbol: symbol, buy_price: 150, shares: Number(shares) },
				],
			});
		}
		setTimeout(this.saveData, 100);
		setTimeout(this.refreshCurrentPrices, 100);
	}

	handleSell(e) {}

	handleBuySymbolChange(e) {
		this.setState({ buySymbol: e.target.value });
	}

	handleBuySharesChange(e) {
		this.setState({ buyShares: e.target.value });
	}

	refreshCurrentPrices() {
		console.log('refreshing...');
		this.newOwnedStocks = [];
		this.state.owned_stocks.forEach((owned_stock) => {
			let current_price = 130;
			this.newOwnedStocks.push({
				symbol: owned_stock.symbol,
				buy_price: owned_stock.buy_price,
				shares: owned_stock.shares,
				current_price: current_price,
			});
			this.setState({ owned_stocks: this.newOwnedStocks });
		});
	}

	componentDidMount() {
		if (ls('owned_stocks') != null) {
			this.setState({
				owned_stocks: ls('owned_stocks'),
			});
		}
		setTimeout(this.refreshCurrentPrices, 100);
		setTimeout(this.saveData, 100);
	}

	render() {
		return (
			<div className="App">
				<h1>
					Cash: <span className="text-success">${this.state.cash}</span>
				</h1>
				<Container className="mt-4">
					<Row>
						<Col>
							<StockList owned_stocks={this.state.owned_stocks} />
						</Col>
						<Col>
							<Form>
								<Form.Row>
									<Form.Group as={Col}>
										<Form.Label>Stock Symbol</Form.Label>
										<Form.Control
											placeholder="Ex: TSLA"
											onChange={this.handleBuySymbolChange}
											value={this.state.buySymbol}
										/>
									</Form.Group>
									<Form.Group as={Col}>
										<Form.Label>Shares</Form.Label>
										<Form.Control
											placeholder="Ex: 4"
											type="number"
											onChange={this.handleBuySharesChange}
											value={this.state.buyShares}
										/>
									</Form.Group>
								</Form.Row>
								<Button variant="success" type="submit" onClick={this.handleBuy}>
									Buy
								</Button>
								<Button variant="danger" type="submit" className="ml-1">
									Sell
								</Button>
							</Form>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default App;
