import Hero from "./Components/Hero";
import HrContainer from "../../Components/GreyHrContainer";
import AuctionsHome from "./Components/Auctions";
import OwnershipHome from "./Components/Ownership";
import CollectionsHome from "./Components/Collections";
import AboutUsHome from "./Components/AboutUs";
import FAQ from "./Components/FAQ";
import axios from "axios";
import "./index.css";
import { useEffect, useState } from "react";

export default function Home() {
	const [artsData, setArtsData] = useState([]);
	const [collectionsData, setCollectionsData] = useState([]);
	const [liveArtsData, setLiveArtsData] = useState([]);
	const [upcomingArtsData, setUpcomingArtsData] = useState([]);
	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BACKEND_BASE_URL + "/api/get_all_arts/")
			.then((response) => {
				const data = response.data;
				setArtsData(data);
				setLiveArtsData(data.filter((obj) => obj.live === true));
				setUpcomingArtsData(
					data.filter(
						(obj) => obj.live === false && obj.art_start_datetime !== null
					)
				);
			});
		axios
			.get(process.env.REACT_APP_BACKEND_BASE_URL + "/api/get_all_collections/")
			.then((response) => {
				const data = response.data;
				setCollectionsData(data);
			});
	}, []);

	return (
		<div className="home-page">
			<Hero />
			<HrContainer />
			<AboutUsHome />
			<HrContainer />
			<AuctionsHome collectionsData={collectionsData} />
			{/* <HrContainer /> */}
			{/* <CollectionsHome collections={collectionsData} /> */}
			<HrContainer />
			<OwnershipHome />
			<HrContainer />
			<FAQ />
			{/* <HrContainer /> */}
		</div>
	);
}
