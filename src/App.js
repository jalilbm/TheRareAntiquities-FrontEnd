import { ConfigProvider } from "antd";
import React from "react";
import Header from "./Layouts/Header";
import SignUpLayout from "./Layouts/SignUp";
import FooterLayout from "./Layouts/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./Routes";

const customTheme = {
	token: {
		colorPrimary: "#cc78d4",
		colorLink: "red",
	},
	components: {
		Button: {
			borderRadius: "23.36px",
			backgroundImage: "linear-gradient(to right, #cc78d4, #5f5f5f)",
		},
	},
};

const App = () => (
	<ConfigProvider theme={customTheme}>
		<div className="main-app">
			<Header />
			<Main />
			<SignUpLayout />
			<FooterLayout />
		</div>
	</ConfigProvider>
);

export default App;
