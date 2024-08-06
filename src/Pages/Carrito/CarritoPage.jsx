//React
import { useState, useEffect } from "react";

//React Router
import { useNavigate } from "react-router-dom";

//Hooks
import useDB from "Hooks/useDB";

//Library
import { Button } from "@ClanersLatam/libs";

//Material UI
import { Box, Typography } from "@mui/material";

const CarritoPage = () => {
	const { getList } = useDB();
	const [list, setList] = useState([]);

	useEffect(() => {
		getList().then((response) => {
			console.table(response.data);
			setList(response.data);
		});
	}, []);

	const navigate = useNavigate();

	return (
		<Box display="flex" flexDirection="column" gap="1rem">
			<Typography component="h1" fontWeight={300} fontSize="2rem" fontFamily="Arial">
				Carrito
			</Typography>
			<Button onClick={() => navigate("/")}>IR A HOME</Button>
			<ul style={{ color: "black" }}>
				{list?.map(({ user, color }, index) => {
					if (color) {
						return (
							<li key={index}>
								{color} : {String(user)}
							</li>
						);
					}
				})}
			</ul>
		</Box>
	);
};

export default CarritoPage;
