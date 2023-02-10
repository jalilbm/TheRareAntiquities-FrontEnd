import { Button, Input, Divider, message } from "antd";
import { useState, useContext, useMemo, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Modal from "../../../../../../Components/Modal";

var regexp = /^\d+(\.\d{1,18})?$/;

const decimalNumberRegex = /^\d*\.?\d*$/;

export default function BidInputAndButtons(props) {
	const [messageApi, contextHolder] = message.useMessage();
	const [bidData, setBidData] = useState({
		bidEmail: null,
		artName: props.artName,
		projectURL: window.location.href,
		bidAmount: null,
	});
	const [subscriberEmail, setSubscriberEmail] = useState("");
	const [showEmailModel, setShowEmailModel] = useState(false);
	const [bidMethod, setBidMethod] = useState("");

	const artData = props.artData;
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
		if (!regexp.test(bidData.bidAmount)) {
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
		} else {
			setShowEmailModel(true);
		}
	}

	function getPaymentCheckoutUrl(bidMethod) {
		console.log("hahahahaha", bidMethod, bidMethod === "card", bidData);
		let url = "";
		if (bidMethod === "card") {
			url =
				process.env.REACT_APP_BACKEND_BASE_URL + "/api/stripe/create-charge/";
		} else {
			url =
				process.env.REACT_APP_BACKEND_BASE_URL + "/api/coinbase/create-charge/";
		}

		axios.post(url, bidData).then((response) => {
			if (response.status === 200) {
				if (bidMethod === "card")
					window.location.replace(response.data.hosted_url);
				else window.location.replace(response.data.data.hosted_url);
			}
		});
	}

	return (
		<div className="w-100">
			{contextHolder}
			{artData && artData.live && (
				// {artData && (
				<div className="center-div">
					<div style={{ width: "90%" }}>
						<div className="center-div">
							<div>
								<p className="bold-p">Total bid amount</p>
								<span>$</span>
								{null || 0}
							</div>
							<Divider
								type="vertical"
								style={{ borderLeft: "1px solid black" }}
							/>
							<div>
								<p className="bold-p">Number of bidders</p>
								<p>{null || 0}</p>
							</div>
							<Divider
								type="vertical"
								style={{ borderLeft: "1px solid black" }}
							/>
							<div>
								<p className="bold-p">Bid range</p>
								<p>
									<span>$</span>
									{null || 0} <span>-</span> <span>$</span>
									{null || 0}
								</p>
							</div>
						</div>

						<br />
						<>
							<div className="center-div">
								<Input
									id="bid-amount"
									prefix="$"
									suffix="USD"
									className="bid-amount"
									placeholder="10000 USDT"
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
				<Modal
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
		</div>
	);
}
