import { Button, Form, Input, Typography } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};

const validateMessages = {
	required: "${label} is required!",
	types: {
		email: "${label} is not a valid email!",
	},
};

const { Paragraph } = Typography;

export default function InformationForm(props) {
	const [step, setStep] = useState(1);
	const onFinish = (values) => {
		if (step === 1) {
			console.log(values);
			let payload = {
				artName: props.artData.name,
				fullName: values.user.name,
				address: `${values.user.address}, ${values.user.address_2}`,
				email: values.user.email,
				reference: props.randomString,
			};
			axios
				.post(
					process.env.REACT_APP_BACKEND_BASE_URL +
						`/api/register_full_art_buyer/`,
					payload
				)
				.then((response) => {
					console.log(response.status, response);
					if (response.status !== 201) {
						props.messageApi.open({
							type: "error",
							content: "Please try again later",
							duration: 7,
						});
						props.hideModal();
					}
				})
				.catch((error) => {
					props.messageApi.open({
						type: "error",
						content: "Please try again later",
						duration: 7,
					});
					props.hideModal();
				});
			setStep(2);
		} else {
			props.hideModal();
		}
	};
	return (
		<Form
			{...layout}
			name="nest-messages"
			onFinish={onFinish}
			style={{ alignContent: "left" }}
			validateMessages={validateMessages}
			className="py-4"
		>
			{step === 1 ? (
				<div>
					<h5>Please enter your information bellow:</h5>
					<Form.Item
						name={["user", "name"]}
						label="Full name"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name={["user", "email"]}
						label="Email"
						rules={[
							{
								type: "email",
								required: true,
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name={["user", "address"]}
						label="Address line 1"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name={["user", "address_2"]}
						label="Address line 2"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input />
					</Form.Item>
				</div>
			) : (
				<div>
					<div>
						<div
							style={{
								backgroundColor: "#e9e9e9",
								border: "1px solid lightgrey",
							}}
							className="my-2 px-2"
						>
							<p className="pre-text my-0 art-buyer-label-name">
								Deposit amount:{" "}
							</p>
							<Paragraph copyable={true} className="my-0">
								{Number(props.artData.buy_now_price).toLocaleString()}
							</Paragraph>
						</div>
						<div
							style={{
								backgroundColor: "#e9e9e9",
								border: "1px solid lightgrey",
							}}
							className="my-2 px-2"
						>
							<p className="pre-text my-0 art-buyer-label-name">
								Deposit method:{" "}
							</p>
							<Paragraph copyable={true} className="my-0">
								Bank Frick (SWIFT)
							</Paragraph>
						</div>
						<div className="my-2 pt-3">
							<p
								className="my-0"
								style={{ fontSize: "0.9rem", fontWeight: "600" }}
							>
								BANK DETAILS
							</p>
						</div>
						<div
							style={{
								backgroundColor: "#e9e9e9",
								border: "1px solid lightgrey",
							}}
							className="my-2 px-2"
						>
							<p className="pre-text my-0 art-buyer-label-name">Name: </p>
							<Paragraph copyable={true} className="my-0">
								Sama L Ain Galley
							</Paragraph>
						</div>
						<div
							style={{
								backgroundColor: "#e9e9e9",
								border: "1px solid lightgrey",
							}}
							className="my-2 px-2"
						>
							<p className="pre-text my-0 art-buyer-label-name">Address: </p>
							<Paragraph copyable={true} className="my-0">
								The Walk, Jumeirah Beach Residence, Dubai, UAE
							</Paragraph>
						</div>
						<div
							style={{
								backgroundColor: "#e9e9e9",
								border: "1px solid lightgrey",
							}}
							className="my-2 px-2"
						>
							<p className="pre-text my-0 art-buyer-label-name">IBAN: </p>
							<Paragraph copyable={true} className="my-0">
								AE200260001015784408301
							</Paragraph>
						</div>
						<div
							style={{
								backgroundColor: "#e9e9e9",
								border: "1px solid lightgrey",
							}}
							className="my-2 px-2"
						>
							<p className="pre-text my-0 art-buyer-label-name">
								Bank account:{" "}
							</p>
							<Paragraph copyable={true} className="my-0">
								1015784308301
							</Paragraph>
						</div>
						<div style={{ display: "flex", justifyContent: "space-between" }}>
							<div
								style={{
									backgroundColor: "#e9e9e9",
									border: "1px solid lightgrey",
									width: "48%",
								}}
								className="my-2 px-2"
							>
								<p className="pre-text my-0 art-buyer-label-name">
									Bank name:{" "}
								</p>
								<Paragraph copyable={true} className="my-0">
									Emirates NBD
								</Paragraph>
							</div>

							<div
								style={{
									backgroundColor: "#e9e9e9",
									border: "1px solid lightgrey",
									width: "48%",
								}}
								className="my-2 px-2"
							>
								<p className="pre-text my-0 art-buyer-label-name">
									BIC/SWIFT:{" "}
								</p>
								<Paragraph copyable={true} className="my-0">
									EBILAEADXXX
								</Paragraph>
							</div>
						</div>

						<div
							style={{
								backgroundColor: "#e9e9e9",
								border: "1px solid lightgrey",
							}}
							className="my-2 px-2"
						>
							<p className="pre-text my-0 art-buyer-label-name">
								Bank/Branch address:{" "}
							</p>
							<Paragraph copyable={true} className="my-0">
								160 Jumeirah St, Jumeirah, Jumeirah 1, Dubai, UAE
							</Paragraph>
						</div>

						<div
							style={{
								backgroundColor: "#e9e9e9",
								border: "1px solid lightgrey",
							}}
							className="my-2 px-2"
						>
							<div className="left-div">
								<p className="pre-text my-0 art-buyer-label-name">
									Reference:{" "}
								</p>{" "}
								<p
									className="pre-text mt-1 mx-1 px-2"
									style={{
										backgroundColor: "orange",
										borderRadius: "16px",
										fontSize: "0.7rem",
									}}
								>
									REQUIRED
								</p>
							</div>

							<Paragraph copyable={true} className="my-0">
								{props.randomString}
							</Paragraph>
						</div>
						<div className="my-2">
							<p className="my-0" style={{ fontSize: "0.9rem" }}>
								<span style={{ fontWeight: "bold" }}>IMPORTANT:</span> This code
								identifies your deposit with your account. Include this code
								when submitting the wire transfer.
							</p>
						</div>
					</div>
				</div>
			)}

			<div className="pt-2">
				<Form.Item
					wrapperCol={{
						...layout.wrapperCol,
						offset: 8,
					}}
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "right",
						width: "95%",
					}}
				>
					<Button type="primary" htmlType="submit" className="">
						{step === 1 ? "Next" : "Close"}
					</Button>
				</Form.Item>
			</div>
		</Form>
	);
}
