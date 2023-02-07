import axios from "axios";
import "./index.css";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";
import Card from "./Components/Card";
import Description from "./Components/Description";
import HrContainer from "../../Components/GreyHrContainer";

export default function Art() {
	const { artName } = useParams();
	const [artData, setArtData] = useState(null);
	useEffect(() => {
		axios
			.get(process.env.REACT_APP_BACKEND_BASE_URL + `/api/get_art/${artName}/`)
			.then((response) => {
				const data = response.data;
				setArtData(data);
			});
	}, []);
	return (
		<div className="auction-page">
			<Card artData={artData} />
			<Container>
				<h4 className="m-0" style={{ color: "purple" }}>
					Description
				</h4>
			</Container>
			<HrContainer style={{ margin: "5px 0 5px 0" }} />
			<Container>
				<h4 className="m-0" style={{ color: "purple" }}>
					{artName}
				</h4>
			</Container>
			<br />
			<Description artData={artData} />
		</div>
	);
}
