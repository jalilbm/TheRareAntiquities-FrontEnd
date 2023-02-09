import { Card } from "antd";
import CountDown from "../CountDown";
import { TbLivePhoto } from "react-icons/tb";
import { AiOutlineFieldTime } from "react-icons/ai";
import "./index.css";

let { Meta } = Card;

export default function ArtCard(props) {
	const card = props.card;
	return (
		<Card
			key={card.key}
			cover={
				<div
					className="center-div p-2 card-image-div"
					style={{
						height: "450px",
						// window.innerWidth > 1000
						// 	? "480px"
						// 	: window.innerWidth > 767
						// 	? "300px"
						// 	: "100%",
						border: "none",
						color: "white",
					}}
				>
					<div className="center-div h-100">
						<img
							alt={card.title}
							src={card.image}
							style={{
								width: "100%",
								objectFit: "contain",
								// height: "100vh",
								borderRadius: "23px",
								border: "none",
							}}
						/>
					</div>
				</div>
			}
			style={{
				borderRadius: "0 !important",
				overflow: "hidden",
				border: "none",
				background: "transparent",
			}}
		>
			<Meta
				style={{ color: "white !important" }}
				title={card.name}
				description={
					<div>
						<p className="my-1" style={{ color: "white !important" }}>
							{card.head}
						</p>
						<div
							style={{
								display: "flex",
								justifyContent: "left",
							}}
						>
							<div className="center-div">
								<div className="center-div">
									{card.live ? (
										<TbLivePhoto
											style={{
												fontSize: "1rem",
											}}
										/>
									) : (
										<AiOutlineFieldTime
											style={{
												color: "white",
												fontSize: "1.2rem",
											}}
										/>
									)}
								</div>
								<p className="px-1 m-0 text-danger">
									{card.live ? (
										"Live"
									) : card.auction_start_datetime ? (
										<CountDown
											deadline={card.auction_start_datetime}
											style={{
												fontSize: "1rem",
												color: "white",
												margin: "0",
											}}
										/>
									) : (
										""
									)}
								</p>
							</div>
						</div>
					</div>
				}
			/>
		</Card>
	);
}
