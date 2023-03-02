import axios from "axios";

const AuthAxiosRequest = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_BASE_URL + "/api/",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
		accept: "application/json",
	},
});

// Add a request interceptor to check for the access token and refresh it if it has expired
AuthAxiosRequest.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem("access_token");
		const refreshToken = localStorage.getItem("refresh_token");

		if (token) {
			// Check if the access token has expired
			const decodedToken = jwt_decode(token);
			const currentTime = Date.now() / 1000;
			if (decodedToken.exp < currentTime) {
				// Access token has expired, try to get a new one with the refresh token
				if (refreshToken) {
					try {
						const response = await AuthAxiosRequest.post("token/refresh/", {
							refresh: refreshToken,
						});
						localStorage.setItem("access_token", response.data.access);
						localStorage.setItem("refresh_token", response.data.refresh);
						config.headers["Authorization"] = `Bearer ${response.data.access}`;
					} catch (error) {
						// Refresh token has expired or is invalid, redirect to login page
						window.location.href = "/login";
					}
				} else {
					// No refresh token available, redirect to login page
					window.location.href = "/login";
				}
			} else {
				config.headers["Authorization"] = `Bearer ${token}`;
			}
		} else {
			// No access token available, redirect to login page
			window.location.href = "/login";
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default AuthAxiosRequest;
