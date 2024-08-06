//React Router
import { useNavigate } from "react-router-dom";

//Hooks
import useDB from "Hooks/useDB";

//Library
import { Button } from "@ClanersLatam/libs";

//Material UI
import { Box, Typography } from "@mui/material";

const HomePage = () => {
	const { insertOne } = useDB();

	const navigate = useNavigate();

	return (
		<Box display="flex" flexDirection="column" gap="1rem">
			<Typography component="h1" fontWeight={300} fontSize="2rem" fontFamily="Arial">
				Home
			</Typography>
			<Button onClick={() => navigate("/carrito")}>IR A Carrito</Button>
			<Button
				onClick={() =>
					insertOne({ color: "purple", user: false })
						.then((response) => {
							console.table(response.data);
						})
						.catch((error) => {
							console.error(error.response.data);
						})
				}
			>
				INSERTAR UNO
			</Button>
		</Box>
	);
};

export default HomePage;
