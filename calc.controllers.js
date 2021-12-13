const axios = require("axios");

const calc = async (req, res) => {
	const { coinId, currency } = req.query;
	try {
		const resData = await axios.get(
			`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${currency}`
		);

		res.status(200).send(resData.data);
	} catch (err) {
		console.log(err.message);
		res.status(500).json(err.message);
	}
};

// let's do everything here.
// get single currency
const currency = async (req, res) => {
	const country = req.body.country;
	try {
        const curr = await axios.post(
			"https://countriesnow.space/api/v0.1/countries/currency",
			{
				country,
			}
		);
        // console.log(curr)
		res.status(200).send(curr.data);
    } catch (err) {
        res.status(500).json(err.message)
    }

};

module.exports = { calc, currency };
