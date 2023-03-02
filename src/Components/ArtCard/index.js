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
						height: "480px",
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
							className="p-1"
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
				style={{ color: "white !important" }}
				title={card.artist_name + " - " + card.name}
				description={
					<div>
						<p>
							{card.head.length > 50
								? card.head.substring(0, 47) + "..."
								: card.head}
						</p>
						<div className="left-div">
							<p className="p-09 p-600 pre-text">Artist: </p>
							<p className="p-09">{card.artist_name}</p>
						</div>
						<div className="left-div">
							<p className="p-09 p-600 pre-text">Lot: </p>
							<p className="p-09">{card.lot}</p>
						</div>
						<div className="left-div">
							<p className="p-09 p-600 pre-text">Buy Now Price: </p>
							<p className="p-09">
								${Number(card.buy_now_price).toLocaleString()}
							</p>
						</div>
						<div className="left-div">
							<p className="p-09 p-600 pre-text">Valuation: </p>
							<p className="p-09">
								${Number(card.price_estimation_min).toLocaleString()} - $
								{Number(card.price_estimation_max).toLocaleString()}
							</p>
						</div>

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
												color: "red",
											}}
										/>
									) : new Date(card.auction_start_datetime) > new Date() ? (
										<AiOutlineFieldTime
											style={{
												color: "red",
												fontSize: "1.2rem",
											}}
										/>
									) : null}
								</div>
								<p className="px-1 m-0 text-danger">
									{card.live ? (
										"Live"
									) : new Date(card.auction_start_datetime) > new Date() &&
									  card.auction_start_datetime ? (
										<CountDown
											deadline={card.auction_start_datetime}
											style={{
												fontSize: "1rem",
												color: "white",
												margin: "0",
											}}
										/>
									) : card.bought_at_one_price ||
									  card.total_bids_amount >= card.reserve_price ? (
										<p
											className="px-2"
											style={{
												color: "white",
												textAlign: "center",
												backgroundColor: "#58C84D",
												borderRadius: "26px",
												margin: "0",
											}}
										>
											{" "}
											Sold
										</p>
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
