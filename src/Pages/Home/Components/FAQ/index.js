import { Collapse } from "antd";
import SectionHeader from "../../../../Components/SectionHead";
import { Container } from "react-bootstrap";
import PurpleHr from "../../../../Components/PurpleHr";
import "./index.css";

const { Panel } = Collapse;
const FAQ = () => (
	<Container>
		<div className="center-div" id="home-collections-section">
			<SectionHeader
				title="FAQ"
				head="Frequently Asked Questions"
				description=""
				textAlign="center"
				width="500px"
			/>
		</div>
		<div className="center-div">
			<PurpleHr style={{ width: "25%", minWidth: "180px" }} />
		</div>
		<Collapse ghost>
			<Panel header={<h5>How is the Art Authenticated?</h5>} key="1">
				<p className="mx-4">
					We utilize our unique encryption technology to authenticate each and
					every NFT. Within each NFT fraction is an encrypted image, and it can
					only be decrypted with a one-of-a-kind encryption key unique to that
					fraction.
					<br /> The encrypted image shows the certificate of Authenticity,
					providing proof of ownership of the art and legitimacy.
				</p>
			</Panel>
			<Panel
				header={<h5>What is Fractionalization and how does it work?</h5>}
				key="2"
			>
				<p className="mx-4">
					There are famous highly valued works of art all around the world.
					Fractionalization is the technology that allows these highly valued
					items to be accessible by many within minutes.
					<br /> Any number of fractions or fraction sizes can be bought or sold
					using our native token $RAT on our NFT Marketplace.
					<br /> Each fraction is of a unique shape and size and is entirely
					configurable before fractionalization. Once fractionalized, all
					fractions are distributed as individual NFTs to the fraction owners.
					<br /> The authenticity of each piece of art is ensured through the
					encryption of the certificate of authenticity inside each and every
					NFT fraction.
				</p>
			</Panel>
			<Panel
				header={<h5>What are Fractionalized Auctions and Shared Ownership?</h5>}
				key="3"
			>
				<p className="mx-4">
					Fractionalized Auctions allow multiple users to bid on the same piece,
					any amount can be contributed to the auction and contributors are
					guaranteed a fraction/NFT proportionate to their contribution. Once
					the auction is completed then the piece is fractionalized by the
					number of unique contributors.
					<br /> We developed a function called “Force Buyout”. It allows users
					that own 51% or more fractions to buy out the remaining. The unique
					owners of the rest of the fractions will then vote on a minimum price
					they would accept, and the average is calculated and used as a buyout
					price.
				</p>
			</Panel>
			<Panel
				header={<h5>What happens to the art when an auction is completed?</h5>}
				key="4"
			>
				<p className="mx-4">
					When an auction is completed and the reserve price has been met, the
					real-world art is taken as consignment on behalf of the shared owners.
					Once the art is consigned, the items are exhibited with a QR code
					placed in galleries, auction houses, hotels, and more. When scanning
					the QR code, potential buyers will be directed to the NFT marketplace
					where they can purchase shared ownership of real-world art through the
					NFT fractions on sale.
				</p>
			</Panel>
		</Collapse>
		<br />
	</Container>
);
export default FAQ;
