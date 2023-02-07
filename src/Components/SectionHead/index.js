import { Button } from "antd";

export default function SectionHead(props) {
	return (
		<div
			className="section-head p-1"
			style={{
				textAlign: props.textAlign || "left",
				width: props.width || "100%",
			}}
		>
			<h1 className="gradient-purple-text">{props.title}</h1>
			<h2>{props.head}</h2>
			<h6>{props.description}</h6>
			{props.buttonText && (
				<Button type="primary" onClick={props.buttonFunction}>
					{props.buttonText}
				</Button>
			)}
		</div>
	);
}
