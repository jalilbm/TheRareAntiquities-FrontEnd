import SectionHeader from "../../../../Components/SectionHead";
import aboutUsImage from "../../../../Assets/HomePageImages/aboutUsImage.png";
import { Image } from "antd";
import { Container } from "react-bootstrap";

export default function AboutUsHome() {
	return (
		<div>
			<div className="center-div">
				<SectionHeader
					title="About Us"
					head="Strong Appreciation Over
    The Last 25+ Years"
					description="See how Contemporary Art performance compares to other major asset classes."
					textAlign="center"
					width="400px"
					buttonText="Read More"
				/>
			</div>
			<Container>
				<div className="center-div py-3">
					<Image
						preview={false}
						src={aboutUsImage}
						alt="section_img"
						style={{ maxWidth: "800px" }}
					/>
				</div>
			</Container>
		</div>
	);
}
