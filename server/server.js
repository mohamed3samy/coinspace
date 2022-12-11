require('dotenv').config();
const express = require('express');
const socketIo = require('socket.io');
const axios = require('axios');

const cryptoRoutes = require('./routes/cryptoRoutes');

const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
	console.log(`coinspace app on port ${port}!`)
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const socketHandler = socketIo(server);

socketHandler.on('connection', (socket) => {
	socket.on('connect_error', () => {
		console.log('Connection error!');
	});

	socket.on('disconnect', () => {
		console.log('Client Disconnected!');
	});

	console.log('Client connected!');
});

// Get prices data from messari api
const getPrices = () => {
	axios
		.get(process.env.CRYPTO_LIST_URL, {
			headers: {
				'x-messari-api-key': process.env.MESSARI_API_KEY,
			},
		})
		.then(({ data }) => {
			const priceList = data.data.map((item) => {
				return {
					id: item.id,
					name: item.name,
					symbol: item.symbol,
					price: item.metrics.market_data.price_usd,
				};
			});

			socketHandler.emit('crypto', priceList);
		})
		.catch((err) => {
			console.error(err);
			socketHandler.emit('crypto', {
				message: 'Error fetching prices data from api',
			});
		});
};

setInterval(() => {
	getPrices();
}, 5000);

app.use('/api/crypto', cryptoRoutes);
