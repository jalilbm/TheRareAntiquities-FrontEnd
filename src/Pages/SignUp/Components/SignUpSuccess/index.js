import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd";
import tick_green from "../../../../Assets/tick_green.png";

function SignUpSuccess() {
	const [countdown, setCountdown] = useState(15);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const interval = setInterval(() => {
			setCountdown((countdown) => countdown - 1);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		const timeout = setTimeout(() => {
			navigate(-2);
		}, 15000);

		return () => {
			clearTimeout(timeout);
		};
	}, [navigate, location.state]);

	const handleBack = () => {
		navigate(-2);
	};

	return (
		<div
			style={{
				height: "50vh",
			}}
			className="center-div"
		>
			<div style={{ textAlign: "center" }}>
				<img src={tick_green} alt="Success" style={{ width: "100px" }} />
				<h2>Thanks for signing up!</h2>
				<p>Please check your email to confirm your account.</p>
				<p>You will be redirected in {countdown} seconds.</p>
				<Button onClick={handleBack}>Back to previous page</Button>
			</div>
		</div>
	);
}

export default SignUpSuccess;
