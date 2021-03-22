import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default function ({ stock }) {
	return (
		<ListGroup.Item>
			<p className="stock-info mt-3 font-weight-bold">{stock.ticker}</p>{' '}
			<p className="stock-info">
				Portfolio Value:{' '}
				<span className={stock.current_price > stock.buy_price ? 'text-success' : 'text-danger'}>
					${stock.current_price * stock.shares}
				</span>
			</p>
			<p className="stock-info">
				Current Price:{' '}
				<span className={stock.current_price > stock.buy_price ? 'text-success' : 'text-danger'}>
					{stock.current_price != null ? '$' + stock.current_price : 'Loading...'}
				</span>
			</p>
			<p className="stock-info">
				Buy Price:{' '}
				<span className={stock.current_price > stock.buy_price ? 'text-success' : 'text-danger'}>
					${stock.buy_price}
				</span>
			</p>
			<p className="stock-info">
				Shares: <span className="text-info">{stock.shares}</span>
			</p>
			<a className="stock-info text-danger" href="">
				Sell all
			</a>
		</ListGroup.Item>
	);
}
