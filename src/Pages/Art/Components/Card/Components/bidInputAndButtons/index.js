import { Button, Input, Divider, message, Collapse } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import CardCryptoModal from "../../../../../../Components/Modal";
import { useLocation } from "react-router-dom";
import BuyerFormModal from "../BuyerFormModal";
import { Col, Row } from "react-bootstrap";
import ReactGA from "react-ga";

// import { w3cwebsocket as W3CWebSocket } from "websocket";

var regexp = /^\d+(\.\d{1,18})?$/;
const { Panel } = Collapse;
const decimalNumberRegex = /^\d*\.?\d*$/;

function randomString() {
	let result = "";
	let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let charactersLength = characters.length;
	for (let i = 0; i < 16; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

let randomString_ = randomString();

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

	function randomString() {
		let result = "";
		let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let charactersLength = characters.length;
		for (let i = 0; i < 16; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

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
						content: "Something went wrong, please try again later",
						duration: 5,
					});
				}
			})
			.catch(() => {
				messageApi.open({
					type: "error",
					content: "Something went wrong, please try again later",
					duration: 5,
				});
			});
	};

	useEffect(() => {
		if (bidMethod === "card" || bidMethod === "crypto") {
			if (!regexp.test(bidData.bidAmount)) {
				messageApi.open({
					type: "error",
					content: "Please enter a valid amount to complete your bid!",
					duration: 5,
				});
				setBidMethod(null);
			} else if (
				artData &&
				artData.min_bid_allowed &&
				bidData.bidAmount < Number(artData.min_bid_allowed)
			) {
				messageApi.open({
					type: "error",
					content: `The minimum bid allowed is ${artData.min_bid_allowed}`,
					duration: 5,
				});
				setBidMethod(null);
			} else if (
				artData &&
				artData.max_bid_allowed &&
				bidData.bidAmount > Number(artData.max_bid_allowed)
			) {
				messageApi.open({
					type: "error",
					content: `The maximum bid allowed is ${artData.max_bid_allowed}`,
					duration: 5,
				});
				setBidMethod(null);
			} else {
				if (bidMethod === "card") {
					ReactGA.event({ category: "art", action: "bid", label: "card" });
					getPaymentCheckoutUrl(bidMethod);
				} else {
					ReactGA.event({ category: "art", action: "bid", label: "crypto" });
					setShowEmailModel(true);
				}
			}
		} else if (bidMethod === "bank transfer") {
			ReactGA.event({
				category: "art",
				action: "buy now",
				label: "buy now btn",
			});
			setShowBankTransferModel(true);
		}
	}, [bidMethod]);

	function getPaymentCheckoutUrl(bidMethod) {
		let url = "";
		if (bidMethod === "card") {
			url =
				process.env.REACT_APP_BACKEND_BASE_URL + "/api/stripe/create-charge/";
		} else if (bidMethod === "crypto") {
			url =
				process.env.REACT_APP_BACKEND_BASE_URL + "/api/coinbase/create-charge/";
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
			{/* <div className="center-div">
				<div className="left-div" style={{ width: "90%" }}>
					<div className="left-div"></div>
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
							<p style={{ fontWeight: "600", fontSize: "0.9rem" }}>
								How do I bid?
							</p>
							<p style={{ fontSize: "0.9rem" }}>
								To bid and own a part of the real world piece of art you simply
								enter the value you wish to own and complete the payment by
								crypto or card. When the auction ends the art will have a final
								sale price and you will receive a % of the art proportionate to
								your bid.
							</p>
							<p style={{ fontWeight: "600", fontSize: "0.9rem" }}>
								What do I receive?
							</p>
							<p style={{ fontSize: "0.9rem" }}>
								At the end of the auction you receive real world ownership of
								the art which is sent to you by email as an NFT. An NFT acts as
								a digital deed and representation of your ownership and it shows
								you the part of the painting you can call yours. You can then
								sell your ownership of the art by selling your NFT on any NFT
								Marketplace.
							</p>
							<p style={{ fontWeight: "600", fontSize: "0.9rem" }}>
								What else do I get?
							</p>
							<p style={{ fontSize: "0.9rem" }}>
								Once the auction is complete you will receive a fraction from
								the art which is proportionate to your bid. Using our fraction
								locator you will be able to identify which part of the art you
								now own. Your NFT fraction is authenticated and we will provide
								the ability for you to have your fraction printed and delivered
								so you may show off the part of the art you own in your very own
								home.
							</p>
							<p style={{ fontWeight: "600", fontSize: "0.9rem" }}>
								How do I own the entire painting?
							</p>
							<p style={{ fontSize: "0.9rem" }}>
								To own the entire painting and have it delivered to your
								preferred location you may use the Buy Now option. If there is
								no Buy Now option then once the auction is complete you have the
								ability to buy other fractions from other owners of the same
								piece of art on the NFT Marketplace. Once you own 51% or more of
								a single piece of art you can force buy out the remaining
								fraction owners giving you 100% ownership. At which point you
								can collect or arrange delivery of the physical piece of art.
							</p>
							<p style={{ fontWeight: "600", fontSize: "0.9rem" }}>
								Are there other benefits too?
							</p>
							<p style={{ fontSize: "0.9rem" }}>
								All paintings curated by The Rare Antiquities are 3D scanned and
								are displayed in our museums and galleries in the Metaverse,
								'The Rare City'. Simply by having shared ownership of a painting
								on exhibition provides you with profit sharing for all entry
								fees paid to enter the museum or gallery where your art is on
								display. You can even display your part of the art in your own
								private space in the Metaverse too!
							</p>
						</Panel>
					</Collapse>
				</div>
			</div> */}
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
							<Row className="w-100 m-0">
								<Col md={4} className="px-0 py-3">
									<div>
										<div>
											<p style={{ fontWeight: "600" }}>Total Bid</p>
											<span>$</span>
											{Number(artData.total_bids_amount).toLocaleString() || 0}
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
											<div>
												<p className="bold-p" style={{ fontWeight: "600" }}>
													Number of owners
												</p>
												<p>{artData.number_of_biders || 0}</p>
											</div>
											<div>
												<p className="bold-p" style={{ fontWeight: "600" }}>
													Ownership range
												</p>
												<p>
													<span>$</span>
													{Number(
														artData.min_bided_amount || 0
													).toLocaleString()}{" "}
													<span>-</span> <span>$</span>
													{Number(
														artData.max_bided_amount || 0
													).toLocaleString()}
												</p>
											</div>
										</div>
									</div>
								</Col>
								<Col md={4} className="px-0 py-3">
									<div>
										<p className="bold-p" style={{ fontWeight: "600" }}>
											Price
										</p>
										<p>
											${Number(artData.buy_now_price || 0).toLocaleString()}
										</p>
									</div>
								</Col>
								<Col md={4} className="px-0 py-3">
									<div className="w-100">
										<Button
											className="auction-bid-button w-100"
											type="primary"
											name="card"
											style={{ border: "none", borderRadius: "0" }}
											onClick={() => {
												changeMethod("bank transfer");
											}}
										>
											Buy It Now
										</Button>
									</div>
								</Col>
							</Row>
						</div>
					</div>
				)}
			{artData && artData.live && !artData.bought_at_one_price && (
				// {artData && (
				<>
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
											}}
										>
											Bid by card
										</Button>
										<Button
											className="auction-bid-button"
											id="bid-by-crypto"
											type="primary"
											name="crypto"
											onClick={() => {
												changeMethod("crypto");
											}}
										>
											Bid by crypto
										</Button>
									</div>
								</div>
							</>
						</div>
					</div>
				</>
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
					hideModal={() => {
						setBidMethod(null);
						setShowEmailModel(false);
					}}
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
					randomString={randomString_}
					hideModal={() => {
						setShowBankTransferModel(false);
						setBidMethod(null);
						randomString_ = randomString();
					}}
					setBidData={(values) => setBidData(values)}
					bidData={bidData}
					setValue={(email) => {
						setBidData({ ...bidData, bidEmail: email });
					}}
					onOk={() => {
						setShowBankTransferModel(false);
					}}
					messageApi={messageApi}
				/>
			)}
		</div>
	);
}
