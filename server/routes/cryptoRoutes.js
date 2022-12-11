const router = require('express').Router();

const {
	getCrypto,
	getMarketData,
	handleCryptoError,
	handleMarketDataError,
} = require('../controllers/cryptoController');

router.use('/profile/:id', getCrypto);
router.use('/profile', handleCryptoError);

router.use('/market-data/:id', getMarketData);
router.use('/market-data', handleMarketDataError);

module.exports = router;
