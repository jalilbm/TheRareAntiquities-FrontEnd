import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import OwnerImg1 from "../../../../Assets/HomePageImages/ownership1.png";
import OwnerImg2 from "../../../../Assets/HomePageImages/ownership2.png";
import OwnerImg3 from "../../../../Assets/HomePageImages/ownership3.png";
import OwnerImg4 from "../../../../Assets/HomePageImages/ownership4.png";
import SectionHeader from "../../../../Components/SectionHead";
import "./index.css";

export default function Ownership() {
	return (
		<div className="p-2">
			<div className="center-div">
				<SectionHeader
					title="Live Auction Collective OwnerShip"
					head="Of Iconic And Historical Digitalized Real World Art!"
					description="Fractionalization is also a unique way to unlock liquidity of high
					valued real world art and creative a second revenue stream without
					ever losing ownership of your physical piece."
					textAlign="center"
					width="600px"
					buttonText=""
				/>
			</div>
			<Container>
				<Row>
					<Col md={3}>
						<div className="owner_upper_div">
							<img src={OwnerImg1} alt="" />
							<p>
								Reap the benefits of the first and only automated NFT
								fractionalization platform
							</p>
						</div>
					</Col>
					<Col md={3}>
						<div className="owner_upper_div" style={{ marginTop: "60px" }}>
							<img src={OwnerImg2} alt="" />
							<p>
								Art and artefact worth millions can be owned without the price
								tag for the entire piece
							</p>
						</div>
					</Col>
					<Col md={3}>
						<div className="owner_upper_div">
							<img src={OwnerImg3} alt="" />
							<p>
								Reward yourself with the entire piece of art by owning the
								majority of fractions and force buying out remaining fraction
								owners
							</p>
						</div>
					</Col>
					<Col md={3}>
						<div className="owner_upper_div" style={{ marginTop: "60px" }}>
							<img src={OwnerImg4} alt="" />
							<p>
								There’s no other program that walks you through exactly what you
								need to know to start an online store fast, written by someone
								who has built several 7-figure ecommerce businesses from
								scratch.
							</p>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}
