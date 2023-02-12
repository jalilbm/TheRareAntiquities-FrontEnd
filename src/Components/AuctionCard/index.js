import { Card } from "antd";
// import CountDown from "../CountDown";
// import { TbLivePhoto } from "react-icons/tb";
// import { AiOutlineFieldTime } from "react-icons/ai";

let { Meta } = Card;

export default function ArtCard(props) {
	const card = props.card;

	function parseDate(dateString) {
		const date = new Date(dateString); // Use a dummy year, such as 2000, so that the Date object can be parsed
		const options = { month: "short" };
		const month = date.toLocaleDateString("en-US", options);
		return `${date.getDate()} ${month}`;
	}
	return (
		<Card
			key={card.key}
			// hoverable
			cover={
				<div
					className="center-div p-2 card-image-div"
					style={{
						height: "480px",
						// window.innerWidth > 1000
						// 	? "450px"
						// 	: window.innerWidth > 767
						// 	? "300px"
						// 	: "100%",
						border: "none",
					}}
				>
					<div className="center-div h-100">
						<img
							alt={card.title}
							src={card.image}
							style={{
								width: "100%",
								objectFit: "contain",
								height: "100%",
								// borderRadius: "23px",
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
				description={
					<div style={{ color: "white" }}>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								width: "100%",
							}}
						>
							<div
								className="center-div px-2 py-1"
								style={{
									background: "rgba(0, 0, 0, 0.3)",
									borderRadius: "23px",
								}}
							>
								<p>{parseDate(card.auction_start_datetime)}</p> -{" "}
								<p>{parseDate(card.deadline)}</p>
							</div>
							<div>ONLINE AUCTION</div>
						</div>
						<hr />
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<p>{card.name}</p>
							<p>
								{card.name === "Royal Picasso"
									? card.collection_arts.length - 1
									: card.collection_arts.length || 1}{" "}
								Lot
								{card.collection_arts.length > 1 ? "s" : ""}{" "}
								{card.auction_address}
							</p>
						</div>
					</div>
				}
			/>
		</Card>
	);
}
