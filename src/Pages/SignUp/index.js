import { useState } from "react";
import { Form, Input, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { notification } from "antd";

export default function SignupForm() {
	const navigate = useNavigate();
	const location = useLocation();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

	const onFinish = async (values) => {
		setLoading(true);
		// Simulate an API request to sign up the user
		await new Promise((resolve) => setTimeout(resolve, 2000));
		console.log(values);
		const payload = { email: values.email, password: values.password };
		await axios
			.post(
				process.env.REACT_APP_BACKEND_BASE_URL + "/api/user/register/",
				payload
			)
			.then((response) => {
				if (response.status === 201) {
					navigate("/signup-success");
				} else {
					console.log(response.data);
					notification.error({
						message: "User registration failed",
						description: response.data,
						placement: "top",
					});
				}
			})
			.catch((error) => {
				console.log(error);
				if (
					error.response &&
					error.response.status === 400 &&
					error.response.data &&
					error.response.data.email &&
					error.response.data.email[0]
				) {
					const message = error.response.data.email[0];
					notification.error({
						message: "User registration failed",
						description: message,
						placement: "top",
					});
				} else {
					notification.error({
						message: "User registration failed",
						description: error.message,
						placement: "top",
					});
				}
			});
		setLoading(false);
	};

	const handleCancel = () => {
		navigate("/");
	};

	const validatePassword = (_, value) => {
		if (value && value.length < 8) {
			return Promise.reject(
				new Error("Password must be at least 8 characters")
			);
		}
		return Promise.resolve();
	};

	return (
		<div className="mx-auto px-3 my-5" style={{ maxWidth: "800px" }}>
			<Form
				form={form}
				onFinish={onFinish}
				layout="vertical"
				requiredMark={true}
			>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{ required: true, message: "Please enter your email" },
						{ type: "email", message: "Please enter a valid email" },
					]}
				>
					<Input placeholder="Enter your email" />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{ required: true, message: "Please enter your password" },
						{ validator: validatePassword },
					]}
				>
					<Input.Password placeholder="Enter your password" />
				</Form.Item>

				<Form.Item
					label="Confirm Password"
					name="confirmPassword"
					dependencies={["password"]}
					rules={[
						{ required: true, message: "Please confirm your password" },
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error("Passwords do not match"));
							},
						}),
					]}
				>
					<Input.Password placeholder="Confirm your password" />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit" loading={loading}>
						Sign Up
					</Button>
					<Button onClick={handleCancel} style={{ marginLeft: 8 }}>
						Cancel
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
