import { Route, Routes } from "react-router-dom";

//Pages
import HomePage from "Pages/Home/HomePage";
import CarritoPage from "Pages/Carrito/CarritoPage";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/carrito" element={<CarritoPage />} />
		</Routes>
	);
};

export default App;
