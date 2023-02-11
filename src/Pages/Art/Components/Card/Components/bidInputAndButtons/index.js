import { Button, Input, Divider, message } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import CardCryptoModal from "../../../../../../Components/Modal";
import { useLocation } from "react-router-dom";
import BuyerFormModal from "../BuyerFormModal";
import { Col, Row } from "react-bootstrap";

// import { w3cwebsocket as W3CWebSocket } from "websocket";

var regexp = /^\d+(\.\d{1,18})?$/;

const decimalNumberRegex = /^\d*\.?\d*$/;

export default function BidInputAndButtons(props) {
	const [messageApi, contextHolder] = message.useMessage();
	const [bidData, setBidData] = useState({
		bidEmail: null,
		artName: props.artName,
		artURL: window.location.href
			.replace("?payment_status=success", "")
			.replace("?payment_status=success", ""),
		bidAmount: null,
	});
	const [subscriberEmail, setSubscriberEmail] = useState("");
	const [showEmailModel, setShowEmailModel] = useState(false);
	const [showBankTransferModel, setShowBankTransferModel] = useState(false);
	const [bidMethod, setBidMethod] = useState("");
	const [artData, setArtData] = useState(props.artData);
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const paymentStatus = params.get("payment_status");
	const changeMethod = (method) => {
		setBidMethod(method);
	};
	const handleChange = (event) => {
		const inputValue = event.target.value;

		if (decimalNumberRegex.test(inputValue)) {
			setBidData({ ...bidData, bidAmount: inputValue });
		}
	};

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

	function openPopUp() {
		if (
			(bidMethod === "card" || bidMethod === "crypto") &&
			!regexp.test(bidData.bidAmount)
		) {
			messageApi.open({
				type: "error",
				content: "Please enter a valid amount to complete your bid!",
				duration: 5,
			});
		} else if (
			artData.min_bid_allowed &&
			bidData.bidAmount < Number(artData.min_bid_allowed)
		) {
			messageApi.open({
				type: "error",
				content: `The minimum bid allowed is ${artData.min_bid_allowed}`,
				duration: 5,
			});
		} else if (
			artData.max_bid_allowed &&
			bidData.bidAmount > Number(artData.max_bid_allowed)
		) {
			messageApi.open({
				type: "error",
				content: `The maximum bid allowed is ${artData.max_bid_allowed}`,
				duration: 5,
			});
		} else if (bidMethod === "card" || bidMethod === "crypto") {
			setShowEmailModel(true);
		} else {
			setShowBankTransferModel(true);
		}
	}

	function getPaymentCheckoutUrl(bidMethod) {
		let url = "";
		if (bidMethod === "card") {
			url =
				process.env.REACT_APP_BACKEND_BASE_URL + "/api/stripe/create-charge/";
		} else if (bidMethod === "crypto") {
			url =
				process.env.REACT_APP_BACKEND_BASE_URL + "/api/coinbase/create-charge/";
		} else {
		}

		axios.post(url, bidData).then((response) => {
			if (response.status === 200) {
				if (bidMethod === "card")
					window.location.replace(response.data.hosted_url);
				else if (bidMethod === "crypto")
					window.location.replace(response.data.data.hosted_url);
			}
		});
	}

	useEffect(() => {
		// const socket = new WebSocket(
		// 	"ws://" +
		// 		process.env.REACT_APP_BACKEND_BASE_URL.replace("http://", "").replace(
		// 			"https://",
		// 			""
		// 		) +
		// 		`/ws/${props.artName}/`
		// );

		// console.log(1, socket);

		// socket.onmessage = (event) => {
		// 	console.log(event.data);
		// 	// setData(JSON.parse(event.data).data);
		// };

		// socket.onclose = (event) => {
		// 	console.error("WebSocket closed with code: " + event.code);
		// };

		// return () => {
		// 	socket.close();
		// };
		if (paymentStatus === "success")
			messageApi.open({
				type: "success",
				content:
					"Your bid was sent successfully, please know that it might take some time before we receive it!",
				duration: 10,
			});
		else if (paymentStatus === "failed") {
			messageApi.open({
				type: "error",
				content: `Your bid was not sent!`,
				duration: 10,
			});
		}
		const fetchData = async () => {
			const result = await axios(
				process.env.REACT_APP_BACKEND_BASE_URL +
					`/api/get_art/${props.artName}/`
			);
			setArtData(result.data);
			console.log(result.data);
		};

		fetchData();

		const intervalId = setInterval(fetchData, 3000);
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className="w-100">
			{contextHolder}
			{artData &&
				(artData.live ||
					artData.bought_at_one_price ||
					artData.total_bids_amount > 0) && (
					<div
						className="center-div py-3"
						// style={{ fontSize: "0.7rem !important" }}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "left",
								width: "90%",
							}}
						>
							<Row className="w-100">
								<Col md={4}>
									<div>
										<div>
											<p className="bold-p">Total bids amount</p>
											<span>$</span>
											{artData.total_bids_amount || 0}
											<br />
											{artData.bought_at_one_price ||
											artData.total_bids_amount >= artData.reserve_price ? (
												<span
													className="bg-success px-1"
													style={{ color: "white", fontSize: "0.7rem" }}
												>
													Reserve met
												</span>
											) : (
												<span
													className="bg-danger px-1"
													style={{ color: "white", fontSize: "0.7rem" }}
												>
													Reserve not met
												</span>
											)}
										</div>
									</div>
								</Col>
								<Col md={4}>
									<div>
										<div>
											<p className="bold-p">Number of bidders</p>
											<p>{artData.number_of_biders || 0}</p>
										</div>
									</div>
								</Col>
								<Col md={4}>
									<div>
										<div>
											<p className="bold-p">Bid range</p>
											<p>
												<span>$</span>
												{artData.min_bided_amount || 0} <span>-</span>{" "}
												<span>$</span>
												{artData.max_bided_amount || 0}
											</p>
										</div>
									</div>
								</Col>
							</Row>
						</div>
					</div>
				)}
			{artData && artData.live && !artData.bought_at_one_price && (
				// {artData && (
				<div className="center-div">
					<div style={{ width: "90%" }}>
						<>
							<div className="center-div">
								<Input
									id="bid-amount"
									prefix="$"
									suffix="USD"
									className="bid-amount"
									placeholder="Bid amount"
									type="text"
									value={bidData.bidAmount}
									onChange={handleChange}
								/>
							</div>
							<div className="center-div">
								<div
									className="auction-bid-buttons space-between w-100 py-3"
									style={{ display: "flex", justifyContent: "space-between" }}
								>
									<Button
										className="auction-bid-button"
										type="primary"
										name="card"
										onClick={() => {
											changeMethod("card");
											openPopUp();
										}}
									>
										Bid by card
									</Button>
									<Button
										className="auction-bid-button"
										type="primary"
										name="crypto"
										onClick={() => {
											changeMethod("crypto");
											openPopUp();
										}}
									>
										Bid by crypto
									</Button>
								</div>
							</div>
							<div className=" w-100 pb-3">
								<Button
									className="auction-bid-button w-100"
									type="primary"
									name="card"
									style={{ border: "none", borderRadius: "0" }}
									onClick={() => {
										changeMethod("back transfer");
										openPopUp();
									}}
								>
									Buy It Now
								</Button>
							</div>
						</>
					</div>
				</div>
			)}
			<div>
				<Input.Group compact className="subscribe-to-art-span center-div">
					<div className="center-div mx-auto" style={{ width: "90%" }}>
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

			{showEmailModel && (
				<CardCryptoModal
					text={"Please enter your email bellow:"}
					hideModal={() => setShowEmailModel(false)}
					setValue={(email) => {
						setBidData({ ...bidData, bidEmail: email });
					}}
					onOk={() => {
						setShowEmailModel(false);
						getPaymentCheckoutUrl(bidMethod);
					}}
				/>
			)}
			{showBankTransferModel && (
				<BuyerFormModal
					text={"Please enter your information bellow:"}
					artData={artData}
					randomString={props.randomString}
					hideModal={() => setShowBankTransferModel(false)}
					setValue={(email) => {
						setBidData({ ...bidData, bidEmail: email });
					}}
					onOk={() => {
						setShowBankTransferModel(false);
						// getPaymentCheckoutUrl(bidMethod);
					}}
					messageApi={messageApi}
				/>
			)}
		</div>
	);
}
