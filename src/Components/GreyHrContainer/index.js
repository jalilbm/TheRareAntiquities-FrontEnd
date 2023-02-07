import { Container } from "react-bootstrap";

export default (props) => {
	return (
		<Container className="my-0">
			<hr className="break_line" style={props.style ? props.style : null} />
		</Container>
	);
};
