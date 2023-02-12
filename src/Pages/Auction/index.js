import axios from "axios";
import "./index.css";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import ArtCard from "../../Components/ArtCard";
import AuctionsHome from "../Home/Components/Auctions";
import partnerLogo from "../../Assets/Logos/partnerLogo.png";

export default function Home() {
	const { auctionName } = useParams();
	const [auctionsData, setAuctionsData] = useState([]);
	const [auctionData, setAuctionData] = useState(null);
	const [auctionArtsData, setAuctionsArtsData] = useState([]);
	const location = useLocation();

	function parseDate(dateString) {
		const date = new Date(dateString); // Use a dummy year, such as 2000, so that the Date object can be parsed
		const options = { month: "short" };
		const month = date.toLocaleDateString("en-US", options);
		return `${date.getDate()} ${month}`;
	}

	useEffect(() => {
		axios
			.get(
				process.env.REACT_APP_BACKEND_BASE_URL +
					"/api/get_collection/" +
					auctionName +
					"/"
			)
			.then((response) => {
				const data = response.data;

				setAuctionData(data);
			});
		axios
			.get(
				process.env.REACT_APP_BACKEND_BASE_URL +
					"/api/get_arts_by_collection_name/" +
					auctionName +
					"/"
			)
			.then((response) => {
				const data = response.data;
				const sortedArtsData = response.data.sort((a, b) => {
					return a.lot - b.lot;
				});
				setAuctionsArtsData(sortedArtsData);
			});
		axios
			.get(process.env.REACT_APP_BACKEND_BASE_URL + "/api/get_all_collections/")

			.then((response) => {
				const data = response.data;
				setAuctionsData(data.filter((obj) => obj.name !== auctionName));
			});
	}, [location]);

	return (
		<>
			{auctionData && (
				<Container>
					<hr></hr>
					<div
						className="left-div"
						style={{
							color: "purple",
						}}
					>
						<h5>{parseDate(auctionData.auction_start_datetime)} - </h5>{" "}
						<h5> {parseDate(auctionData.deadline)}</h5>
					</div>
					<div className="left-div">
						<h1>{auctionData.name}</h1>{" "}
						<img
							className="px-5"
							src={partnerLogo}
							style={{ height: "60px" }}
						></img>
					</div>
					<div
						className="my-2"
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "left",
						}}
					>
						<div className="center-div">
							<HiLocationMarker
								style={{ color: "purple", fontSize: "1.5rem" }}
							/>{" "}
							<h6 className="m-0">{auctionData.auction_address}</h6>
						</div>
						<div className="center-div mx-5">
							<AiOutlineEye style={{ color: "purple", fontSize: "1.5rem" }} />{" "}
							<h6 className="m-0">View Timing</h6>
						</div>
					</div>
					<Row className="d-flex justify-content-center">
						{auctionArtsData.map(
							(card) =>
								card.name !== "test" && (
									<Col md={4}>
										<Link
											to={`/art/${card.name}/`}
											style={{ textDecoration: "none" }}
										>
											<div
												className="primary-gradient-background p-1 my-2"
												style={{ borderRadius: "23px", border: "none" }}
											>
												<ArtCard card={card} />
											</div>
										</Link>
									</Col>
								)
						)}
					</Row>
					<hr className="my-5"></hr>
					<Row>
						<AuctionsHome
							collectionsData={auctionsData}
							sectionTitle="More Auctions"
							sectionHead=" "
						/>
					</Row>
				</Container>
			)}
		</>
	);
}
