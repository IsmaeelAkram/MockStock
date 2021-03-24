import React from 'react';
import { ListGroup } from 'react-bootstrap';
import StockCard from './StockCard';

export default function ({ owned_stocks }) {
	return (
		<ListGroup>
			{owned_stocks.map((owned_stock) => {
				return <StockCard stock={owned_stock} key={owned_stock.symbol} />;
			})}
			{owned_stocks.length === 0 ? <ListGroup.Item>No stocks.</ListGroup.Item> : <></>}
		</ListGroup>
	);
}
