import RareAntiquitiesLogoBlack from "../../Assets/Logos/RareAntiquitiesLogoBlack.png";
import "./index.css";
import fbIcon from "../../Assets/LayoutsImages/fb.png";
import twitterIcon from "../../Assets/LayoutsImages/twitter.png";
import instagramIcon from "../../Assets/LayoutsImages/insta.png";
import linkedInIcon from "../../Assets/LayoutsImages/linkedin.png";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="footer-layout">
			<div className="footer_div py-4">
				<img src={RareAntiquitiesLogoBlack} width="80px" />
				<div className="footer_links">
					<p>
						<Link to="/" className="link-no-text-decoration">
							Home
						</Link>
					</p>
					<p>
						<Link className="link-no-text-decoration" to="#">
							About Us
						</Link>
					</p>
					<p>
						<Link className="link-no-text-decoration" to="#">
							Auction
						</Link>
					</p>
					<p>
						<Link className="link-no-text-decoration" to="#">
							Collections
						</Link>
					</p>
				</div>

				<div className="social_icons">
					<a href="" target="_blank" rel="noopener noreferrer">
						<img src={fbIcon} />
					</a>
					<a href="" target="_blank" rel="noopener noreferrer">
						<img src={twitterIcon} />
					</a>
					<a href="" target="_blank" rel="noopener noreferrer">
						<img src={instagramIcon} />
					</a>
					<a href="" target="_blank" rel="noopener noreferrer">
						<img src={linkedInIcon} />
					</a>
				</div>

				<div className="terms_of_services pt-0">
					<Link className="link-no-text-decoration" to="">
						Terms Of Service
					</Link>
					<Link className="link-no-text-decoration" to="">
						Privacy Policy
					</Link>
					<Link className="link-no-text-decoration" to="">
						FAQ
					</Link>
					<Link className="link-no-text-decoration" to="">
						How it Works
					</Link>
				</div>
			</div>
			<div className="copywright_container">
				<p>
					© RATBits NFT Marketplace DMCC Crypto Centre, 48th Floor, Almas Tower,
					JLT, UAE PO BOX 48800. All rights reserved.
				</p>
			</div>
		</div>
	);
};

export default Footer;
