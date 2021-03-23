import React, { Component } from 'react';
import { Button, Col, Form } from 'react-bootstrap';

class StockTrader extends Component {
	state = {};
	render() {
		return (
			<Form>
				<Form.Row>
					<Form.Group as={Col}>
						<Form.Label>Stock Symbol</Form.Label>
						<Form.Control placeholder="Ex: TSLA" />
					</Form.Group>
					<Form.Group as={Col}>
						<Form.Label>Shares</Form.Label>
						<Form.Control placeholder="Ex: 4" type="number" />
					</Form.Group>
				</Form.Row>
				<Button variant="success" type="submit">
					Buy
				</Button>
				<Button variant="danger" type="submit" className="ml-1">
					Sell
				</Button>
			</Form>
		);
	}
}

export default StockTrader;
