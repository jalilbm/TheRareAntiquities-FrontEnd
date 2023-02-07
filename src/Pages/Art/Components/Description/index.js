import { Container } from "react-bootstrap";

export default (props) => {
	const artData = props.artData;
	return (
		<div className="py-3">
			<Container>
				<div
					dangerouslySetInnerHTML={{ __html: artData && artData.description }}
					style={{
						maxWidth: "100vw",
					}}
				></div>
			</Container>
		</div>
	);
};
