import "./index.css";
import { Col, Container, Row } from "react-bootstrap";
import { Image } from "antd";
import { Link } from "react-router-dom";
import { TbLivePhoto } from "react-icons/tb";
import CountDown from "../../../../Components/CountDown";
import { AiOutlineFieldTime } from "react-icons/ai";
import { Button, Input, message } from "antd";
import CardBackgroundImage from "../../../../Assets/ArtPageImages/CardBackgroundImage.png";
import axios from "axios";
import { useState } from "react";

export default function ArtCard(props) {
	const artData = props.artData;
	const [messageApi, contextHolder] = message.useMessage();
	const [subscriberEmail, setSubscriberEmail] = useState("");

	const updateSubscriber = (event) => {
		let { value } = event.target;
		setSubscriberEmail(value);
	};

	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(/^\S+@\S+\.\S+$/);
	};

	const handleSubscribe = () => {
		if (!validateEmail(subscriberEmail)) {
			messageApi.open({
				type: "error",
				content: "Invalid email address provided",
			});
			return;
		}
		messageApi.open({
			type: "loading",
			content: "Please wait...",
			duration: 1,
		});
		axios
			.post(
				process.env.REACT_APP_BACKEND_BASE_URL + `/api/website/subscribe/`,
				{
					email: subscriberEmail,
				}
			)
			.then((response) => {
				if (response.status === 200) {
					messageApi.open({
						type: "success",
						content: "You have subscribed successfully!",
						duration: 5,
					});
				} else {
					messageApi.open({
						type: "error",
						content: "Sorry we could not subscribe you, please try again later",
						duration: 5,
					});
				}
			})
			.catch(() => {
				messageApi.open({
					type: "error",
					content: "Sorry we could not subscribe you, please try again later",
					duration: 5,
				});
			});
	};

	return (
		<div className="art-card" style={{ backgroundColor: "white" }}>
			{contextHolder}
			<Link
				className="collection-link"
				to="#"
				style={{ textDecoration: "none" }}
			>
				<Container>
					<h4>
						{artData &&
							artData.collection_name &&
							artData.collection_name + " Colection"}
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
								<Col md={6}>
									<div className="center-div">
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
									</div>
								</Col>
								<Col
									sm={6}
									className="full-col my-4"
									style={{ position: "relative" }}
								>
									<div className="center-div mt-3">
										<div style={{ display: "flex", flexDirection: "column" }}>
											<h2 className="my-0">{artData && artData.name}</h2>
											<div style={{ display: "flex", justifyContent: "left" }}>
												<div className="center-div py-2">
													{artData && artData.live ? (
														<>
															<div className="center-div">
																<TbLivePhoto
																	style={{ color: "red", fontSize: "1rem" }}
																/>
															</div>
															<div>
																<p className="px-1 m-0 text-danger">
																	Live Auctions{" "}
																</p>
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
											<div className=".left-div">
												<p className="measurement">
													<span style={{ fontWeight: "600" }}>
														Measurement:{" "}
													</span>
													{artData && artData.measurement}
												</p>
											</div>
											<div className=".left-div">
												<p className="measurement">
													<span style={{ fontWeight: "600" }}>
														Price Estimation:{" "}
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
										</div>
									</div>
									<div
										className="mx-auto"
										style={{
											alignSelf: "flex-end",
											width: "100%",
											// minWidth: "330px",
										}}
									>
										<div
											className="my-5 mx-auto center-div"
											style={{
												width: "95%",
												maxWidth: "420px",
											}}
										>
											<Input.Group
												compact
												className="subscribe-to-art-span center-div"
											>
												<div className="center-div w-100">
													<Input
														style={{
															width: "100%",
															border: "0.5px solid purple",
														}}
														placeholder="Email"
														type="email"
														className="subscribe-to-art-input"
														onChange={(event) => updateSubscriber(event)}
														value={subscriberEmail}
													/>
													<Button
														type="primary"
														className="subscribe-to-art-btn"
														onClick={handleSubscribe}
														style={{
															border: "0.5px solid purple",
														}}
													>
														Subscribe
													</Button>
												</div>
												<div className="center-div">
													<p>Subscribe to get latest news</p>
												</div>
											</Input.Group>
										</div>
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
