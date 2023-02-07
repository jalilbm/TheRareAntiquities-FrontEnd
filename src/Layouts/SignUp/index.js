import "./index.css";
import { Col, Container, Row } from "react-bootstrap";
import { Button, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import signUpBackgroundImage from "../../Assets/LayoutsImages/signUpBackgroundImage.png";

export default function SignUpLayout() {
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
		<div
			className="signup-layout py-5 my-3"
			style={{
				background: `url(${signUpBackgroundImage})`,
				color: "white !important",
			}}
		>
			{contextHolder}
			<Container className="py-4">
				<Row>
					<Col>
						<div className="center-div">
							<h1 style={{ fontWeight: "bold", color: "white !important" }}>
								Sign Up
							</h1>
						</div>
						<div className="center-div" style={{ fontWeight: "bold" }}>
							<p style={{ textAlign: "center" }}>
								Sign up to The Rare Antiquities website, to get all news about
								fine art and auctions that we host
							</p>
						</div>

						<div
							className="my-4 mx-auto center-div"
							style={{
								width: "80%",
								minWidth: "330px",
							}}
						>
							<div
								className="w-100 p-1 center-div"
								style={{
									border: "2px solid white",
									borderRadius: "23px",
									height: "3rem",
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
												background: "transparent",
												border: "none",
												color: "white",
											}}
											placeholder="Email"
											type="email"
											className="subscribe-to-art-input"
											onChange={(event) => updateSubscriber(event)}
											value={subscriberEmail}
										/>
										<Button
											type="primary"
											// size="large"
											// className="subscribe-to-art-btn"
											onClick={handleSubscribe}
											style={{
												borderRadius: "23px !important",
												height: "100%",
												fontWeight: "bold",
											}}
										>
											Sign Up
										</Button>
									</div>
									<div className="center-div m-1" style={{ color: "white" }}>
										<p>Sign up to get latest news</p>
									</div>
								</Input.Group>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
