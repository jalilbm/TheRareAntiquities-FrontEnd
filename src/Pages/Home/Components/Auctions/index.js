import SectionHeader from "../../../../Components/SectionHead";
import AuctionCard from "../../../../Components/AuctionCard";
import PurpleHr from "../../../../Components/PurpleHr";
import { Card } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import "./index.css";
import { Link } from "react-router-dom";

let { Meta } = Card;

export default function AuctionsHome(props) {
	return (
		<div>
			<div className="center-div" id="home-auctions-section">
				<SectionHeader
					title={props.sectionTitle || "Auctions"}
					head={props.sectionHead || "Upcoming Auctions"}
					description=""
					textAlign="center"
					width="400px"
				/>
			</div>
			<div className="center-div">
				<PurpleHr style={{ width: "25%", minWidth: "180px" }} />
			</div>
			{props.collectionsData.length !== 0 && (
				<div>
					<div>
						<Container>
							<div className="mx-auto">
								<Row>
									{props.collectionsData.map((card) => (
										<Col md={4}>
											<Link
												to={`/auction/${card.name}/`}
												style={{ textDecoration: "none" }}
											>
												<div
													className="primary-gradient-background p-1 my-2"
													style={{ borderRadius: "23px", border: "none" }}
												>
													<AuctionCard card={card} />
												</div>
											</Link>
										</Col>
									))}
								</Row>
							</div>
						</Container>
					</div>
				</div>
			)}
		</div>
	);
}
