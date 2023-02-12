import "./index.css";
import { Col, Container, Row } from "react-bootstrap";
import { Image, Carousel, Collapse } from "antd";
import { Link } from "react-router-dom";
import { TbLivePhoto } from "react-icons/tb";
import CountDown from "../../../../Components/CountDown";
import { AiOutlineFieldTime } from "react-icons/ai";
import CardBackgroundImage from "../../../../Assets/ArtPageImages/CardBackgroundImage.png";
import BidInputAndButtons from "./Components/bidInputAndButtons";
// import ImageGallery from "./Components/ImageGallery";

function randomString() {
	let result = "";
	let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let charactersLength = characters.length;
	for (let i = 0; i < 16; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

// for bank transfer reference
const randomString_ = randomString();
const { Panel } = Collapse;

export default function ArtCard(props) {
	const artData = props.artData;
	let images = [];
	if (artData && props.artData.multiple_images.length > 0)
		images = [artData.image, ...props.artData.multiple_images];

	return (
		<div className="art-card" style={{ backgroundColor: "white" }}>
			<Link
				className="collection-link"
				to={artData ? `/auction/${artData.collection_name}/` : "#"}
				style={{ textDecoration: "none" }}
			>
				<Container>
					<h4>
						{artData &&
							artData.collection_name &&
							artData.collection_name + " Collection"}
					</h4>
				</Container>
			</Link>
			<div style={{ backgroundImage: `url(${CardBackgroundImage})` }}>
				<div style={{ background: "rgba(255, 255, 255, .5) " }}>
					<Container className="my-5 py-3">
						<div className="center-div">
							<Row
								className="w-100"
								style={{ height: "100%", position: "relative" }}
							>
								<Col lg={6} className="center-div">
									<div className="center-div w-100">
										{images.length > 1 ? (
											<Carousel
												className="carousel-div p-4"
												style={{ backgroundColor: "white" }}
											>
												{images.map((image) => (
													// <div className="center-div p-4" key={image}>
													<img
														style={{ maxHeight: "400px" }}
														src={image}
														// alt="section_img"
													/>
													// </div>
												))}
											</Carousel>
										) : (
											<div
												className="center-div p-4 image-div"
												style={{
													backgroundColor: "white",
													// border: "1px solid black",
												}}
											>
												<Image
													style={{ maxHeight: "400px" }}
													src={artData && artData.image}
													// alt="section_img"
												/>
											</div>
										)}
									</div>
								</Col>
								<Col
									lg={6}
									className="full-col my-4"
									style={{ position: "relative" }}
								>
									<div className="mt-3">
										<div style={{ display: "flex", flexDirection: "column" }}>
											<h2 className="my-0">{`${
												artData && artData.artist_name
											} - ${artData && artData.name}`}</h2>
											<div style={{ display: "flex", justifyContent: "left" }}>
												<div className="center-div py-2">
													{artData && artData.live ? (
														<>
															<div className="center-div">
																<TbLivePhoto
																	style={{ color: "red", fontSize: "1rem" }}
																/>
															</div>
															<div className="center-div">
																<p
																	className="px-1 m-0"
																	style={{ color: "red" }}
																>
																	Live Auctions,
																</p>
																<p className="pre-text">Ends: </p>

																<CountDown
																	deadline={artData && artData.deadline}
																	artData={artData && artData}
																	style={{
																		fontSize: "1rem",
																		color: "red",
																		margin: "0",
																	}}
																/>
															</div>
														</>
													) : artData && artData.auction_start_datetime ? (
														<>
															<div className="center-div">
																<AiOutlineFieldTime
																	style={{
																		color: "red",
																		fontSize: "1rem",
																	}}
																/>
															</div>
															<div className="px-1 m-0">
																<div className="center-div">
																	<p
																		className="m-0 pre-text"
																		style={{ color: "#FF0200" }}
																	>
																		Starts in:{" "}
																	</p>
																	<CountDown
																		deadline={
																			artData && artData.auction_start_datetime
																		}
																		setLive={() =>
																			props.setArtData({
																				...artData,
																				live: true,
																			})
																		}
																		style={{
																			fontSize: "1rem",
																			color: "red",
																			margin: "0",
																		}}
																	/>
																</div>
															</div>
														</>
													) : null}
												</div>
											</div>
											<div className=".left-div">
												<p className="pre-text">
													<span style={{ fontWeight: "600" }}>Lot: </span>
													{artData && artData.lot}
												</p>
											</div>
											{artData && artData.artist_name && (
												<div className=".left-div">
													<p className="artist_name">
														<span style={{ fontWeight: "600" }}>Artist: </span>
														{artData && artData.artist_name}
													</p>
												</div>
											)}
											{artData && artData.measurement && (
												<div className=".left-div">
													<p className="measurement">
														<span style={{ fontWeight: "600" }}>
															Measurement:{" "}
														</span>
														{artData && artData.measurement}
													</p>
												</div>
											)}
											<div className=".left-div">
												<p className="measurement">
													<span style={{ fontWeight: "600" }}>Valuation: </span>
													$
													{artData &&
														artData.price_estimation_min.toLocaleString()}{" "}
													- $
													{artData &&
														artData.price_estimation_max.toLocaleString()}
												</p>
											</div>
											<div className=".left-div">
												<p className="measurement">
													<span style={{ fontWeight: "600" }}>
														Description:{" "}
													</span>
													{artData && artData.head}
												</p>
											</div>
										</div>
									</div>
									<div
										className="mx-auto my-5"
										style={{
											alignSelf: "flex-end",
											width: "100%",
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
											// minWidth: "330px",
										}}
									>
										<BidInputAndButtons
											artData={artData}
											artName={props.artName}
											randomString={randomString_}
										/>
									</div>
								</Col>
							</Row>
						</div>
					</Container>
				</div>
			</div>
		</div>
	);
}
