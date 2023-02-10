import { Modal, Input } from "antd";
import { useRef, useState } from "react";
import Draggable from "react-draggable";

const CustomModal = (props) => {
	const [open, setOpen] = useState(true);
	const [disabled, setDisabled] = useState(false);
	const [value, setValue] = useState(null);
	const [bounds, setBounds] = useState({
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
	});
	const draggleRef = useRef(null);
	const handleOk = (e) => {
		props.onOk();
		// setOpen(false);
	};
	const handleCancel = (e) => {
		props.hideModal();
	};
	const onStart = (_event, uiData) => {
		const { clientWidth, clientHeight } = window.document.documentElement;
		const targetRect = draggleRef.current?.getBoundingClientRect();
		if (!targetRect) {
			return;
		}
		setBounds({
			left: -targetRect.left + uiData.x,
			right: clientWidth - (targetRect.right - uiData.x),
			top: -targetRect.top + uiData.y,
			bottom: clientHeight - (targetRect.bottom - uiData.y),
		});
	};
	const updateInputValue = (event) => {
		let { value } = event.target;
		setValue(value);
		props.setValue(value);
	};
	return (
		<>
			<Modal
				title={
					<div
						style={{
							width: "100%",
							cursor: "move",
						}}
						onMouseOver={() => {
							if (disabled) {
								setDisabled(false);
							}
						}}
						onMouseOut={() => {
							setDisabled(true);
						}}
						// fix eslintjsx-a11y/mouse-events-have-key-events
						// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
						onFocus={() => {}}
						onBlur={() => {}}
						// end
					>
						{props.text}
					</div>
				}
				open={open}
				onOk={handleOk}
				onCancel={handleCancel}
				modalRender={(modal) => (
					<Draggable
						disabled={disabled}
						bounds={bounds}
						onStart={(event, uiData) => onStart(event, uiData)}
					>
						<div ref={draggleRef}>{modal}</div>
					</Draggable>
				)}
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
