import { Modal } from "antd";
import { useState } from "react";
import InformationForm from "./informationForm";

const BuyerFormModal = (props) => {
	const [value, setValue] = useState(null);

	const handleOk = (e) => {
		props.onOk();
	};
	const handleCancel = (e) => {
		props.hideModal();
		props.setBidData({
			...props.bidData,
			bidEmail: "",
			bidAmount: null,
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
				open={true}
				// title={props.text}
				// onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
				width={800}
			>
				<div>
					<InformationForm
						artData={props.artData}
						randomString={props.randomString}
						hideModal={props.hideModal}
						messageApi={props.messageApi}
						setBidData={(values) => props.setBidData(values)}
						bidData={props.bidData}
					/>
				</div>
			</Modal>
		</>
	);
};
export default BuyerFormModal;
