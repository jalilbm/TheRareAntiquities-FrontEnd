import { Button, Form, Input, Typography, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import countriesJson from "../../../../../../data/countries.json";
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
	const [countries, setCountries] = useState([]);
	// for bank transfer reference

	useEffect(() => {
		setCountries(countriesJson);
	}, []);

	function handlePayByCrypto() {
		const url =
			process.env.REACT_APP_BACKEND_BASE_URL + "/api/coinbase/create-charge/";
		axios.post(url, props.bidData).then((response) => {
			if (response.status === 200) {
				window.location.replace(response.data.data.hosted_url);
			}
		});
	}

	const onFinish = (values) => {
		if (step === 1) {
			console.log(values);
			let payload = {
				artName: props.artData.name,
				fullName: `${values.user.name} | ${values.user.name_2}`,
				address: `${values.user.address} | ${values.user.address_2} | ${values.user.state} | ${values.user.zip} | ${values.user.country} | ${values.user.phone}`,
				email: values.user.email,
				reference: props.randomString,
			};
			props.setBidData({
				...props.bidData,
				bidEmail: payload.email,
				bidAmount: props.artData.buy_now_price,
			});
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
					<h5 className="mb-4">
						{props.artData.name} - $
						{Number(props.artData.buy_now_price).toLocaleString()}
					</h5>
					<h6>Please fill the form bellow:</h6>

					<Form.Item
						name={["user", "name"]}
						label="First name"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name={["user", "name_2"]}
						label="Last name"
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
					<p style={{ fontWeight: "600", fontSize: "0.9rem" }}>
						Shipping address:
					</p>
					<Form.Item
						name={["user", "address"]}
						label="Street address"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item name={["user", "address_2"]} label="Street address 2">
						<Input />
					</Form.Item>
					<Form.Item
						name={["user", "city"]}
						label="City"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item name={["user", "state"]} label="State/Province">
						<Input />
					</Form.Item>
					<Form.Item
						name={["user", "zip"]}
						label="Zip code"
						rules={[
							{
								required: true,
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="country"
						name={["user", "country"]}
						rules={[
							{
								required: true,
							},
						]}
					>
						<Select defaultValue="Select a country">
							{countries.map((country) => (
								<Select.Option key={country.name} value={country.name}>
									{country.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item
						name={["user", "phone"]}
						label="phone"
						rules={[
							{ required: true, message: "Please input your phone number!" },
						]}
					>
						<Input />
						{/* <Input
							addonBefore={
								<Form.Item name="prefix" noStyle>
									<Select style={{ width: 90 }}>
										{countries.map((country) => (
											<Select.Option
												key={country.dial_code}
												value={country.dial_code}
											>
												{country.dial_code}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							}
							style={{ width: "100%" }}
						/> */}
					</Form.Item>
				</div>
			) : (
				<div>
					<div>
						<Button onClick={handlePayByCrypto} type="primary">
							Pay By Crypto
						</Button>
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
						<div className="my-3" style={{ fontSize: "0.7rem" }}>
							<p
								className="m-0"
								style={{ fontWeight: "bold", fontSize: "0.8rem" }}
							>
								Additional information
							</p>
							<hr className="my-0"></hr>
							<p className="my-0" style={{ fontSize: "0.8rem" }}>
								The name on the bank account you are depositing from must match
								the name entered for verification on the Sama-L-Ain account you
								are depositing into.
							</p>
						</div>
					</div>
				</div>
			)}

			<div className="pt-2">
				<Form.Item
					wrapperCol={{
						...layout.wrapperCol,
						offset: 5,
					}}
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "right",
						// width: "95%",
					}}
				>
					<div style={{ justifySelf: "flex-end" }}>
						<div className="center-div">
							<Button type="primary" htmlType="submit">
								{step === 1 ? "Next" : "Close"}
							</Button>
						</div>
					</div>
				</Form.Item>
			</div>
		</Form>
	);
}
