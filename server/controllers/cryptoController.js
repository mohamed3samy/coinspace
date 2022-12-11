const axios = require('axios');

// @desc    Get crypto details
// @routes  Get /api/profile/:id
// @access  public
const getCrypto = (req, res) => {
	const { id } = req.params;

	if (!id) {
		res.status(404).json({ message: 'crypto id not found' });
	}

	axios
		.get(`${process.env.BASE_URL_V2}/${id}/profile`, {
			headers: {
				'x-messari-api-key': process.env.MESSARI_API_KEY,
			},
		})
		.then(({ data }) => {
			res.json(data.data);
		})
		.catch((err) => {
			res.json({
				message: 'Error fetching prices data from api',
				errDetails: err,
			});
		});
};

// @desc    Get market data
// @routes  Get /api/market-data/:id
// @access  public
const getMarketData = (req, res) => {
	const { id } = req.params;

	if (!id) {
		res.status(404).json({ message: 'crypto id not found' });
	}

	axios
		.get(`${process.env.BASE_URL_V1}/${id}/metrics/market-data`, {
			headers: {
				'x-messari-api-key': process.env.MESSARI_API_KEY,
			},
		})
		.then(({ data }) => {
			res.json(data.data);
		})
		.catch((err) => {
			res.json({
				message: 'Error fetching market data from api',
				errDetails: err,
			});
		});
};

const handleCryptoError = (req, res) => {
	res.status(404).json({ message: 'crypto id not found' });
};

const handleMarketDataError = (req, res) => {
	res.status(404).json({ message: 'crypto id not found' });
};

module.exports = {
	getCrypto,
	getMarketData,
	handleCryptoError,
	handleMarketDataError,
};
