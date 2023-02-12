import { Statistic } from "antd";
import "./index.css";
const { Countdown } = Statistic;

export default function CountDown(props) {
	let deadline = new Date(props.deadline);
	const onFinish = () => {
		if (props.setLive) props.setLive();
	};
	return (
		<Countdown
			value={deadline}
			format="D[d] H[h] m[m] s[s]"
			valueStyle={props.style}
			onFinish={onFinish}
		/>
	);
}
