import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "../Pages/Home";
import Art from "../Pages/Art";
import Auctions from "../Pages/Auctions";
import Auction from "../Pages/Auction";
import TermsAndConditions from "../Pages/TermsAndConditions";
import SignUp from "../Pages/SignUp";
import SignUpSuccess from "../Pages/SignUp/Components/SignUpSuccess";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import { useEffect } from "react";

export default function Main() {
	const { pathname, hash, key } = useLocation();
	useEffect(() => {
		// if not a hash link, scroll to top
		if (hash === "") {
			window.scrollTo(0, 0);
		}
		// else scroll to id
		else {
			setTimeout(() => {
				const id = hash.replace("#", "");
				const element = document.getElementById(id);
				if (element) {
					element.scrollIntoView({ block: "start" });
				}
			}, 0);
		}
	}, [pathname, hash, key]); // do this on route change

	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/art/:artName" element={<Art />} />
			<Route exact path="/auctions" element={<Auctions />} />
			<Route exact path="/auction/:auctionName" element={<Auction />} />
			<Route
				exact
				path="/terms-and-conditions"
				element={<TermsAndConditions />}
			/>
			<Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
			<Route exact path="/signup" element={<SignUp />} />
			<Route exact path="/signup-success" element={<SignUpSuccess />} />
		</Routes>
	);
}
