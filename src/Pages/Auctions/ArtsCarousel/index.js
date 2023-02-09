import "./index.css";
import { Container } from "react-bootstrap";
import { Carousel } from "antd";
import ArtCard from "../../../Components/ArtCard";
import { Link } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export default function ArtsCarousel(props) {
	const collection = props.collection;
	const arts = props.arts;
	return (
		<div className="collection-arts-carousel">
			<Container>
				<div key={collection.name} id={collection.name}>
					<h3 style={{ color: "purple" }}>{collection.name}</h3>
				</div>
			</Container>
			<div
				className="mx-auto carousel-background-image"
				style={{
					backgroundImage: `url(${collection.image})`,
					backgroundSize: "cover",
				}}
			></div>

			<div>
				<Container>
					<Carousel
						autoplay
						arrows
						prevArrow={<LeftOutlined />}
						nextArrow={<RightOutlined />}
						slidesToShow={1}
						dots={false}
					>
						{arts.map((card) => (
							<div className="center-div" style={{ height: "100%" }}>
								<div
									className="mx-auto p-1 center-div"
									style={{ width: "75%", maxWidth: "400px" }}
								>
									<Link
										to={`/art/${card.name}/`}
										style={{ textDecoration: "none" }}
									>
										<div style={{ width: "300px" }}>
											<ArtCard card={card} />
										</div>
									</Link>
								</div>
							</div>
						))}
					</Carousel>
				</Container>
			</div>
		</div>
	);
}
