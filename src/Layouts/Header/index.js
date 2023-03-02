import RareAntiquitiesLogoBlack from "../../Assets/Logos/RareAntiquitiesLogoBlack.png";
import "./index.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Sling as Hamburger } from "hamburger-react";
import LoginModal from "./Components/LoginModal";
import { Button } from "antd";

export default function MainHeader() {
	return (
		<div className="header_main">
			<section className="nav_section">
				<Navbar expand="md">
					<Container>
						<div className="nav-bar-items">
							<Navbar.Brand as={Link} to="/" className="d-md-none blackIcon">
								<img
									src={RareAntiquitiesLogoBlack}
									alt="logo"
									style={{ width: "70px" }}
								/>
							</Navbar.Brand>
							<Navbar.Collapse
								id="basic-navbar-nav"
								className="nav_explore"
								style={{ width: "40%" }}
							>
								<Nav className="nav_btn">
									<div className="nav-link-div">
										<Nav.Link as={Link} to="/">
											Home
										</Nav.Link>
									</div>
									<div className="nav-link-div">
										<Nav.Link as={Link} to="/about-us">
											About Us
										</Nav.Link>
									</div>
								</Nav>
							</Navbar.Collapse>
							<Navbar.Brand
								className="lg-view-only blackIcon w-0"
								as={Link}
								to="/"
							>
								<img src={RareAntiquitiesLogoBlack} alt="logo" />
							</Navbar.Brand>
							<Navbar.Toggle
								aria-controls="basic-navbar-nav"
								style={{ border: "none", height: "50px" }}
							>
								<div className="center-div">
									<Hamburger
										style={{
											frontSize: "2rem",
											height: "2rem",
											width: "2rem",
										}}
									/>
								</div>
							</Navbar.Toggle>
							<Navbar.Collapse id="basic-navbar-nav" style={{ width: "40%" }}>
								<Nav className="nav_btn" id="right_side_nav">
									<div className="nav-link-div">
										<Nav.Link as={Link} to="/auctions">
											Shared Auctions
										</Nav.Link>
									</div>
									<div className="nav-link-div">
										<Nav.Link as={Link} to="/collections">
											Collections
										</Nav.Link>
									</div>
								</Nav>
								<LoginModal />
								{/* <Button type="primary" href="/signin">
									Sign In
								</Button> */}
							</Navbar.Collapse>
						</div>
					</Container>
				</Navbar>
			</section>
		</div>
	);
}
