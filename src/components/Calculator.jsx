import { useEffect, useState } from "react";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";

import { useInterval } from "../utils/hooks";

const Calculator = () => {
	const [currency, setCurrency] = useState("");
	const [coinId, setCoinId] = useState("");
	const [countryData, setCountryData] = useState([{ name: "", flag: "" }]);
	const [price, setPrice] = useState("");
	const [tCoun, setTCoun] = useState(0);
	const [refresh,setRefresh] = useState("");
	const [country, setCountry] = useState("");

	useEffect(() => {
		setTCoun(price * coinId);
	}, [coinId]);

	const getCountries = async () => {
		const res = await axios.get(
			"https://countriesnow.space/api/v0.1/countries/flag/images"
		);

		const data = res.data.data;
		setCountryData(data);
	};

	const getCurrency = async () => {
		const res = await axios.post(
			"https://countriesnow.space/api/v0.1/countries/currency",
			{
				country: currency,
			}
		);

		const data = res.data.data;
		setCurrency(data.currency);
	};

	const kusamaPrice = async () => {
		const res = await axios.get(
			`http://localhost:5000/?coinId=kusama&currency=usd`
		);
		const data = res.data.kusama.usd;
		console.log(data);
		setPrice(data);
		console.log("called price", data);
		// set [price] --- UI
		// return res.data.kusama.inr
		// same api for refresh (same api line number 40)
		// How are you. Kumar! f ine fine bro .okay. so i will work this project so litte rest work so complete then start my class okay. yeah, okay. okay 

		// remove hard 'inr' in URL
		// select currency (pop up) and update local currency ( call api )
	};

	const kusamaRefresh = async () => {
		const res = await axios.get(
			`http://localhost:5000/?coinId=kusama&currency=${currency}`
		);
		const data = res.data.kusama.usd;
		console.log(data);
		setRefresh(data);
		console.log("called Refresh", data);
		// set [price] --- UI
		// return res.data.kusama.inr
		// same api for refresh (same api line number 40)

		// remove hard 'inr' in URL
		// select currency (pop up) and update local currency ( call api )
	};

	useEffect(() => {
		getCountries();
		getCurrency();
		kusamaPrice();
	}, []);

	useInterval(() => {
		kusamaPrice();
		kusamaRefresh();
	}, 20000);

	return (
		<div className="border border-yellow-300 rounded-lg p-5  w-1/2 text-gray-50 overflow-hidden ">
			<h1 className="text-3xl mb-3 text-yellow-300 font-semibold text-center">
				KusamaCal.com
			</h1>
			{/* list */}
			<ul className="flex items-center text-w mb-3 justify-between  divide-x-2">
				<li>
					<Link to="/price" className="">
						Price
					</Link>
				</li>
				<li>
					<Link to="/staking" className="pl-3">
						Staking
					</Link>
				</li>
				<li>
					<Link to="/pool" className="pl-3">
						Pool
					</Link>
				</li>
				<li>
					<Link to="/Bykusama" className="pl-3">
						Kusama
					</Link>
				</li>
				<li>
					<Link to="/about" className="pl-3">
						About
					</Link>
				</li>
			</ul>
			{/* social links */}
			<div className="flex items-center space-x-5 justify-center my-5">
				<Link to="/twitter">
					<FaTwitter className="hover:opacity-75 w-10" />
				</Link>
				<Link to="/discord">
					<FaDiscord className="hover:opacity-75 w-10" />
				</Link>
				<Link to="/github">
					<AiFillGithub className="hover:opacity-75 w-10" />
				</Link>
			</div>

			<h3>Kusama Current Price: </h3>

			<div>
				<h4 className="text-xl font-semibold"> 1 Kusama = ${price}</h4>
				{/* links */}
				<div className="flex items-center justify-between">
					<h3 className="text-blue-600 font-semibold text-base underline">
						Click Refresh
					</h3>
					<div className="space-x-3">
						<label htmlFor="auto-refresh">
							Auto Refresh ={kusamaRefresh}
						</label>
						<input
							className="bg-blue-600 border border-gray-50 text-blue-600"
							type="checkbox"
							name="auto-refresh"
							id="auto-refresh"
						/>
					</div>
				</div>

				{/* text box */}
				<div className="flex flex-col space-y-2 ">
					<label htmlFor="kusama">Kusama</label>
					<input
						className="bg-gray-700 text-gray-50 py-1 px-2 border border-gray-50 outline-none"
						type="text"
						name="kusama"
						value={coinId}
						onChange={(e) => setCoinId(e.target.value)}
						id="kusama"
					/>
				</div>
				<div className="flex flex-col space-y-2 ">
					<label htmlFor="inr">{currency}</label>
					<input
						className="bg-gray-700 text-gray-50 border border-gray-50 outline-none"
						type="text"
						name="currency"
						value={tCoun}
						onChange={(e) => setTCoun(e.target.value)}
						id="inr"
					/>
				</div>
				{/* select */}
				{/* we'll map through a list of countries and also their maps.*/}
				<label htmlFor="currency">Select Currency</label>
				<select
					name="currency"
					id="currency"
					onChange={(e) => setCountry(e.target.value)}
					className="bg-gray-700 mt-1 p-2 outline-none text-gray-50 w-full"
				>
					{countryData.map((country, index) => (
						<option value={country.name} key={index}>
							{country.name}
							{/* <img src={country.flag} alt={country.name} /> */}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default Calculator;
