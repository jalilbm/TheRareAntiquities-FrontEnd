import SectionHeader from "../../../../Components/SectionHead";
import PurpleHr from "../../../../Components/PurpleHr";
import CountDown from "../../../../Components/CountDown";
import peopleBiddingImage from "../../../../Assets/HomePageImages/auctionBidding_2.jpg";
import { Carousel, Card } from "antd";
import { Container } from "react-bootstrap";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./index.css";
import { TbLivePhoto } from "react-icons/tb";
import { AiOutlineFieldTime } from "react-icons/ai";
import { Link } from "react-router-dom";

let { Meta } = Card;

export default function AuctionsHome(props) {
	return (
		<div>
			<div className="center-div" id="home-auctions-section">
				<SectionHeader
					title="Auctions"
					head="Live & Upcoming Art Auctions"
					description=""
					textAlign="center"
					width="400px"
				/>
			</div>
			<div className="center-div">
				<PurpleHr style={{ width: "25%", minWidth: "180px" }} />
			</div>

			{props.liveArts.length !== 0 && (
				<div>
					<Container className="p-2">
						<>
							<div style={{ display: "flex", justifyContent: "left" }}>
								<div className="center-div py-3">
									<div className="center-div">
										<TbLivePhoto style={{ color: "red", fontSize: "1.5rem" }} />
									</div>
									<>
										<h3 className="px-3 m-0">
											Live Auctions{" "}
											<p
												style={{ fontSize: "1rem", margin: "0", color: "grey" }}
											>
												{props.liveArts.length} masterpiece auction
												{props.liveArts.length > 1 ? "s" : ""} to bid on now
											</p>
										</h3>
									</>
								</div>
							</div>
						</>
					</Container>
					<div
						style={{
							backgroundImage: `url(${peopleBiddingImage})`,
							backgroundSize: "cover",
							backgroundColor: "rgba(0, 0, 0, 0.61)",
							backdropFilter: "blur(5px)",
						}}
					>
						<Container>
							<div className="mx-auto" style={{ maxWidth: "800px" }}>
								<Carousel
									autoplay
									arrows
									prevArrow={<LeftOutlined />}
									nextArrow={<RightOutlined />}
									slidesToShow={1}
									dots={false}
								>
									{props.liveArts.map((card) => (
										<div className="center-div" style={{ height: "100%" }}>
											<div
												className="mx-auto p-1 center-div"
												style={{ width: "75%", maxWidth: "400px" }}
											>
												<Link
													to={`/art/${card.name}/`}
													style={{ textDecoration: "none" }}
												>
													<Card
														key={card.key}
														hoverable
														cover={
															<img
																alt={card.title}
																src={card.image}
																style={{
																	width: "100%",
																	objectFit: "contain",
																	height: "100%",
																	borderRadius: "0px",
																	boxShadow: "red",
																}}
															/>
														}
														style={{
															borderRadius: "0 !important",
															overflow: "hidden",
														}}
													>
														<Meta
															title={card.name}
															description={
																<div>
																	<p className="my-1">{card.head}</p>
																	<div
																		style={{
																			display: "flex",
																			justifyContent: "left",
																		}}
																	>
																		<div className="center-div">
																			<div className="center-div">
																				<TbLivePhoto
																					style={{
																						color: "red",
																						fontSize: "1rem",
																					}}
																				/>
																			</div>
																			<p className="px-1 m-0 text-danger">
																				Live
																			</p>
																		</div>
																	</div>
																</div>
															}
														/>
													</Card>
												</Link>
											</div>
										</div>
									))}
								</Carousel>
							</div>
						</Container>
					</div>
				</div>
			)}

			{props.upcomingArts.length !== 0 && (
				<>
					{/* <div className="center-div">
						<PurpleHr style={{ width: "25%", minWidth: "180px" }} />
					</div> */}
					<Container className="p-2">
						<div style={{ display: "flex", justifyContent: "left" }}>
							<div className="center-div py-3">
								<div className="center-div">
									<AiOutlineFieldTime
										style={{ color: "red", fontSize: "1.5rem" }}
									/>
								</div>
								<h3 className="px-3 m-0">
									Upcoming Auctions{" "}
									<p style={{ fontSize: "1rem", margin: "0", color: "grey" }}>
										{props.upcomingArts.length} masterpiece
										{props.upcomingArts.length > 1 ? "s" : ""} of art coming
										soon (subscription now)
									</p>
								</h3>
							</div>
						</div>
					</Container>
					<Container>
						<div className="mx-auto" style={{ maxWidth: "800px" }}>
							<Carousel
								autoplay
								arrows
								prevArrow={<LeftOutlined />}
								nextArrow={<RightOutlined />}
								slidesToShow={1}
								dots={false}
							>
								{props.upcomingArts.map((card) => (
									<div className="center-div" style={{ height: "100%" }}>
										<div
											className="mx-auto p-1 center-div"
											style={{
												width: "75%",
												maxWidth: "400px",
											}}
										>
											<Link
												to={`/art/${card.name}/`}
												style={{ textDecoration: "none" }}
											>
												<Card
													key={card.key}
													hoverable
													cover={
														<img
															alt={card.name}
															src={card.image}
															style={{
																width: "100%",
																objectFit: "contain",
																height: "100%",
															}}
														/>
													}
													style={{ textDecoration: "none" }}
												>
													<Meta
														title={card.name}
														description={
															<div>
																<p className="my-1">{card.head}</p>
																<div
																	style={{
																		display: "flex",
																		justifyContent: "left",
																	}}
																>
																	<div className="center-div">
																		<div className="center-div">
																			<AiOutlineFieldTime
																				style={{
																					color: "red",
																					fontSize: "1rem",
																				}}
																			/>
																		</div>
																		<p className="px-1 m-0 text-danger">
																			<CountDown
																				deadline={card.auction_start_datetime}
																				style={{
																					fontSize: "1rem",
																					color: "red",
																					margin: "0",
																				}}
																			/>
																		</p>
																	</div>
																</div>
															</div>
														}
													/>
												</Card>
											</Link>
										</div>
									</div>
								))}
							</Carousel>
						</div>
					</Container>
				</>
			)}
		</div>
	);
}
