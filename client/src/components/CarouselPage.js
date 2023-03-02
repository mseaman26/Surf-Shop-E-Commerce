import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const CarouselPage = ({ apparel }) => {
	const apparelArr = apparel.categories;
	const responsive = {
		desktop: {
			breakpoint: { max: 4000, min: 1024 },
			items: 1,
		},
		mobile: {
			breakpoint: { max: 768, min: 0 },
			items: 1,
		},
	};
	return (
		<div className="carousel">
			<Carousel
				arrows={true}
				responsive={responsive}
				infinite={true}
				swipeable={true}
				draggable={true}
				keyBoardControl={true}
				containerClass="container"
				removeArrowOnDeviceType={['tablet', 'mobile']}
				// deviceType={this.props.deviceType}
			>
				{apparelArr.map((item) => (
					<div>
						{/* <div>{item.name}</div> */}
						<img src={item.image} />
					</div>
				))}
			</Carousel>
		</div>
	);
};

export default CarouselPage;
