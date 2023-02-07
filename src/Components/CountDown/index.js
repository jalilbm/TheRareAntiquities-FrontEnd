import { Statistic } from "antd";
import "./index.css";
const { Countdown } = Statistic;

export default function CountDown(props) {
	let deadline = new Date(props.deadline);
	const onFinish = () => {
		console.log("finished!");
	};
	return (
		<Countdown
			value={deadline}
			format="D[d] H[h] m[m] s[s]"
			valueStyle={props.style}
		/>
	);
}
