import { useState } from "react";
import { Modal, Form, Input, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

export default function LoginModal() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const inputStyle = {
		"& .ant-input::placeholder": {
			color: "#999999",
		},
	};

	const [visible, setVisible] = useState(false);

	const handleOk = () => {
		setLoading(true);
		// setLoading(true);
		// setVisible(false);
	};

	const handleCancel = () => {
		setVisible(false);
	};

	const onFinish = (values) => {
		console.log("Received values of form: ", values);
		// Handle login logic here
		setVisible(false);
	};

	return (
		<div>
			<Button onClick={() => setVisible(true)} type="primary">
				Sign In
			</Button>
			<Modal
				title=<p style={{ textAlign: "center" }}>
					Sign in to your account to get recommendations, place bids and
					register for sales
				</p>
				open={visible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Link to="/signup" className="mx-2">
						<Button key="signup" onClick={handleCancel}>
							Create Account
						</Button>
					</Link>,
					<Button
						key="submit"
						type="primary"
						form="login-form"
						htmlType="submit"
						loading={loading}
					>
						Sign In
					</Button>,
				]}
			>
				<Form name="login-form" onFinish={onFinish}>
					<Form.Item
						name="email"
						rules={[
							{
								type: "email",
								message: "The input is not a valid email address",
							},
							{
								required: true,
								message: "Please input your email",
							},
						]}
					>
						<Input placeholder="Email" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your password",
							},
						]}
					>
						<Input.Password placeholder="Password" />
					</Form.Item>
				</Form>
				<div>
					<a href="#" type="primary">
						Forgot Password
					</a>
				</div>
			</Modal>
		</div>
	);
}
