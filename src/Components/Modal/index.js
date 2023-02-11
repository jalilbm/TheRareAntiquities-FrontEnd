import { Modal, Input } from "antd";
import { useRef, useState } from "react";
import Draggable from "react-draggable";

const CustomModal = (props) => {
	const [value, setValue] = useState(null);

	const handleOk = (e) => {
		props.onOk();
	};
	const handleCancel = (e) => {
		props.hideModal();
	};

	const updateInputValue = (event) => {
		let { value } = event.target;
		setValue(value);
		props.setValue(value);
	};
	return (
		<>
			<Modal
				open={true}
				title={props.text}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Input
					placeholder="Email"
					type="email"
					onChange={(event) => updateInputValue(event)}
				/>
			</Modal>
		</>
	);
};
export default CustomModal;
