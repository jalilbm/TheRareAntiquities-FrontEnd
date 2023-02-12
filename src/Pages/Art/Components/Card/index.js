import "./index.css";
import { Col, Container, Row } from "react-bootstrap";
import { Image, Carousel, Collapse } from "antd";
import { Link } from "react-router-dom";
import { TbLivePhoto } from "react-icons/tb";
import CountDown from "../../../../Components/CountDown";
import { AiOutlineFieldTime } from "react-icons/ai";
import CardBackgroundImage from "../../../../Assets/ArtPageImages/CardBackgroundImage.png";
import BidInputAndButtons from "./Components/bidInputAndButtons";
import partnerLogo from "../../../../Assets/Logos/partnerLogo.png";
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
										<h2 className="my-0">{`${
											artData && artData.artist_name
										} - ${artData && artData.name}`}</h2>
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
											}}
										>
											<div style={{ display: "flex", flexDirection: "column" }}>
												<div
													style={{ display: "flex", justifyContent: "left" }}
												>
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
																				artData &&
																				artData.auction_start_datetime
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
															<span style={{ fontWeight: "600" }}>
																Artist:{" "}
															</span>
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
														<span style={{ fontWeight: "600" }}>
															Valuation:{" "}
														</span>
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
												<div className=".left-div">
													<Collapse ghost>
														<Panel
															header={
																<p
																	style={{
																		fontWeight: "600",
																		fontSize: "0.9rem",
																	}}
																>
																	Learn More
																</p>
															}
															key="1"
															className="m-0"
														>
															<p
																style={{
																	fontWeight: "600",
																	fontSize: "0.9rem",
																}}
															>
																How do I bid?
															</p>
															<p style={{ fontSize: "0.9rem" }}>
																To bid and own a part of the real world piece of
																art you simply enter the value you wish to own
																and complete the payment by crypto or card. When
																the auction ends the art will have a final sale
																price and you will receive a % of the art
																proportionate to your bid.
															</p>
															<p
																style={{
																	fontWeight: "600",
																	fontSize: "0.9rem",
																}}
															>
																What do I receive?
															</p>
															<p style={{ fontSize: "0.9rem" }}>
																At the end of the auction you receive real world
																ownership of the art which is sent to you by
																email as an NFT. An NFT acts as a digital deed
																and representation of your ownership and it
																shows you the part of the painting you can call
																yours. You can then sell your ownership of the
																art by selling your NFT on any NFT Marketplace.
															</p>
															<p
																style={{
																	fontWeight: "600",
																	fontSize: "0.9rem",
																}}
															>
																What else do I get?
															</p>
															<p style={{ fontSize: "0.9rem" }}>
																Once the auction is complete you will receive a
																fraction from the art which is proportionate to
																your bid. Using our fraction locator you will be
																able to identify which part of the art you now
																own. Your NFT fraction is authenticated and we
																will provide the ability for you to have your
																fraction printed and delivered so you may show
																off the part of the art you own in your very own
																home.
															</p>
															<p
																style={{
																	fontWeight: "600",
																	fontSize: "0.9rem",
																}}
															>
																How do I own the entire painting?
															</p>
															<p style={{ fontSize: "0.9rem" }}>
																To own the entire painting and have it delivered
																to your preferred location you may use the Buy
																Now option. If there is no Buy Now option then
																once the auction is complete you have the
																ability to buy other fractions from other owners
																of the same piece of art on the NFT Marketplace.
																Once you own 51% or more of a single piece of
																art you can force buy out the remaining fraction
																owners giving you 100% ownership. At which point
																you can collect or arrange delivery of the
																physical piece of art.
															</p>
															<p
																style={{
																	fontWeight: "600",
																	fontSize: "0.9rem",
																}}
															>
																Are there other benefits too?
															</p>
															<p style={{ fontSize: "0.9rem" }}>
																All paintings curated by The Rare Antiquities
																are 3D scanned and are displayed in our museums
																and galleries in the Metaverse, 'The Rare City'.
																Simply by having shared ownership of a painting
																on exhibition provides you with profit sharing
																for all entry fees paid to enter the museum or
																gallery where your art is on display. You can
																even display your part of the art in your own
																private space in the Metaverse too!
															</p>
														</Panel>
													</Collapse>
												</div>
											</div>
											<img src={partnerLogo} style={{ height: "80px" }}></img>
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
