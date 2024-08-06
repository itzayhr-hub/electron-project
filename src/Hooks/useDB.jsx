import axios from "axios";

const useDB = () => {
	const getList = () => {
		const options = {
			method: "GET",
			url: "http://localhost:3000/api/mongodb-data",
			headers: { "Content-Type": "application/json" },
		};

		return axios.request(options);
	};

	const insertOne = ({ color, user }) => {
		const options = {
			method: "POST",
			url: "http://localhost:3000/api/mongodb-data",
			headers: { "Content-Type": "application/json" },
			data: { color: color, user: user },
		};

		return axios.request(options);
	};

	return {
		getList: getList,
		insertOne: insertOne,
	};
};

export default useDB;
