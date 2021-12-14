import { Routes, Route } from "react-router-dom";

import Calculator from "./components/Calculator";
import Staking from "./components/Staking";

function App() {
	return (
		<div className="h-screen flex items-center justify-center bg-black text-gray-50">
			<Routes>
				<Route path="/Staking" element={<Staking />} />
			</Routes>
			<Calculator />
		</div>
	);
}

export default App;
