import Auctions from "../../Pages/Home/Components/Auctions";
import axios from "axios";
import "./index.css";
import { useEffect, useState } from "react";

export default function Home() {
	const [collectionsData, setCollectionsData] = useState([]);

	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BACKEND_BASE_URL + "/api/get_all_collections/")
			.then((response) => {
				const data = response.data;
				setCollectionsData(data);
			});
	}, []);

	return <Auctions collectionsData={collectionsData} />;
}
