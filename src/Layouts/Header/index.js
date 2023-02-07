import RareAntiquitiesLogoBlack from "../../Assets/Logos/RareAntiquitiesLogoBlack.png";
import "./index.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MainHeader() {
	return (
		<div className="header_main">
			<section className="nav_section">
				<Navbar expand="lg">
					<Container>
						<Navbar.Brand as={Link} to="/" className="d-lg-none blackIcon">
							<img src={RareAntiquitiesLogoBlack} alt="logo" />
						</Navbar.Brand>
						<Navbar.Collapse id="basic-navbar-nav" className="nav_explore">
							<Nav className="m-auto nav_btn">
								<Nav.Link as={Link} to="/">
									Home
								</Nav.Link>
								<Nav.Link as={Link} to="/about-us">
									About Us
								</Nav.Link>
							</Nav>
						</Navbar.Collapse>
						<Navbar.Brand className="lg_view_only blackIcon" as={Link} to="/">
							<img src={RareAntiquitiesLogoBlack} alt="logo" />
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="ms-auto" id="right_side_nav">
								<Nav.Link as={Link} to="/auctions">
									Auctions
								</Nav.Link>
								<Nav.Link id="products" as={Link} to="/collections">
									Collections
								</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</section>
		</div>
	);
}
