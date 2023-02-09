import { Col, Container, Row, Button } from "react-bootstrap";
import EventImage from "../../../../Assets/HomePageImages/12thFebEvent.jpg";
import { Image } from "antd";
import "./index.css";
import { Link } from "react-router-dom";

const Fractionalized = () => {
	return (
		<Container className="p-3">
			<Row className="align-items-center">
				<Col md={6}>
					<div className="section1_text">
						<h1>
							Shared Ownership <br />
							<span>of</span> Fine Art
						</h1>
						<h5>Bid For Shared Ownership Of Fine Art And Antiquities</h5>
						<p>
							The first platform where every bid in an auction for art of high
							value is guaranteed ownership. Receive fractional ownership
							proportionate to your bid of a curated piece of art worth millions
							and sell your ownership when the art rises in value by selling
							your NFT on the NFT Marketplace.
						</p>
						<div className="pt-3">
							<Button
								as={Link}
								to="/#home-auctions-section"
								className="auction my-2"
							>
								Auctions
							</Button>
							<Button
								as={Link}
								to="/#home-collections-section"
								className="collection"
							>
								Collection
							</Button>
						</div>
					</div>
				</Col>
				<Col md={6}>
					<div className="section1_img">
						<Image height={700} src={EventImage} alt="section_img" />
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Fractionalized;
