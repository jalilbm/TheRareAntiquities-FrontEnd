import SectionHeader from "../../../../Components/SectionHead";
import PurpleHr from "../../../../Components/PurpleHr";
import { Carousel, Card } from "antd";
import { Container } from "react-bootstrap";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import collectionImage from "../../../../Assets/HomePageImages/collection.jpg";
import "./index.css";
import { TfiGallery } from "react-icons/tfi";

const { Meta } = Card;

export default function AuctionsHome(props) {
	return (
		<div>
			<div className="center-div" id="home-collections-section">
				<SectionHeader
					title="Collections"
					head="Featured Art Collections"
					description=""
					textAlign="center"
					width="400px"
				/>
			</div>
			<div className="center-div">
				<PurpleHr style={{ width: "25%", minWidth: "180px" }} />
			</div>
			<Container className="p-2">
				<div style={{ display: "flex", justifyContent: "left" }}>
					<div className="center-div py-3">
						<div className="center-div">
							<TfiGallery style={{ color: "red", fontSize: "1.5rem" }} />
						</div>
						<h3 className="px-3 m-0">
							Exclusive art collections{" "}
							<p style={{ fontSize: "1rem", margin: "0", color: "grey" }}>
								{props.collections.length} art collection
								{props.collections.length > 1 ? "s" : ""} only on The Rare
								Antiquities (subscription now)
							</p>
						</h3>
					</div>
				</div>
			</Container>
			{props.collections.length !== 0 && (
				<div
					style={{
						backgroundImage: `url(${collectionImage})`,
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
								{props.collections.map((card) => (
									<div className="center-div" style={{ height: "100%" }}>
										<div
											className="mx-auto p-1 center-div"
											style={{ width: "75%", maxWidth: "400px" }}
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
															<p className="my-1">{card.description}</p>
															<div
																style={{
																	display: "flex",
																	justifyContent: "left",
																}}
															>
																<div className="center-div">
																	<div className="center-div">
																		<TfiGallery
																			style={{
																				color: "red",
																				fontSize: "1rem",
																			}}
																		/>
																	</div>
																	<p className="px-1 m-0 text-danger">
																		{card.collection_arts.length} Lots
																	</p>
																</div>
															</div>
														</div>
													}
												/>
											</Card>
										</div>
									</div>
								))}
							</Carousel>
						</div>
					</Container>
				</div>
			)}
		</div>
	);
}
