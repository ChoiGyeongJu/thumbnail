/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import prevImg from '../images/prevImg.png';

const MainPage = () => {
	const navigate = useNavigate();
	const [images, setImages] = useState([]);
	const [todayThumbs, setTodayThumbs] = useState([]);
	const [Ismobile, setIsmobile] = useState(false);

	useEffect(() => {
		fetch(`http://3.37.40.39/test/thumb-list`)
			.then(res => res.json())
			.then(data => {
				if (data.message === 'success') {
					setImages(data.thumb_list);
					setTodayThumbs(data.today_thumb_list);
				} else {
				}
			});
	}, []);

	const carousel = useRef();
	const settings = {
		arrows: true,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		pointOnHover: true,
		dots: true,
		autoplay: false,

		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};

	function NextArrow(props) {
		const { style, onClick } = props;
		return (
			<div onClick={onClick}>
				<img className="nextButton" src={prevImg} />
			</div>
		);
	}

	function PrevArrow(props) {
		const { style, onClick } = props;
		return (
			<div onClick={onClick}>
				<img className="prevButton" src={prevImg} />
			</div>
		);
	}

	function useWindowSize() {
		const [windowSize, setWindowSize] = useState({
			width: undefined,
			height: undefined,
		});

		useEffect(() => {
			function handleResize() {
				setWindowSize({
					width: window.innerWidth,
					height: window.innerHeight,
				});
			}
			window.addEventListener('resize', handleResize);
			handleResize();
			return () => window.removeEventListener('resize', handleResize);
		}, []);

		return windowSize;
	}

	const size = useWindowSize();

	useEffect(() => {
		if (size.width > 1515) {
			setIsmobile(false);
		} else {
			setIsmobile(true);
		}
	}, [size]);

	return (
		<div className="main-page">
			<div className="thumb-box">
				<div className="main-title">
					오늘의 썸네일
					<div
						onClick={() => {
							navigate('/thumb');
						}}
						className="move-button"
					>
						제작하러가기
					</div>
				</div>
				{todayThumbs.length > 3 && !Ismobile ? (
					<div className="image-slider">
						<Slider {...settings} ref={carousel}>
							{todayThumbs.map((item, idx) => (
								<div key={idx}>
									<img className="image" src={item} />
								</div>
							))}
						</Slider>
					</div>
				) : (
					<div className="image-box">
						{todayThumbs.map((item, idx) => (
							<div key={idx}>
								<img className="image" src={item} />
							</div>
						))}
						{todayThumbs.length === 0 ? (
							<div className="message">오늘은 아직 제작자가 없습니다..!</div>
						) : null}
					</div>
				)}
			</div>
			<div className="thumb-box" style={{ marginTop: '2rem' }} id="second-box">
				<div className="main-title">
					{Ismobile ? <p>Made by Thumbnail Maker</p> : <p>Thumbnail Maker로 제작된 썸네일</p>}
				</div>
				{images.length > 3 && !Ismobile ? (
					<div className="image-slider">
						<Slider {...settings} ref={carousel}>
							{images.map((item, idx) => (
								<div key={idx}>
									<img className="image" src={item} />
								</div>
							))}
						</Slider>
					</div>
				) : (
					<div className="image-box">
						{images.map((item, idx) => (
							<div key={idx}>
								<img className="image" src={item} />
							</div>
						))}
					</div>
				)}
			</div>
			<div className="footer">
				<div className="info">gyeongju5142@gmail.com</div>
				<div className="info">made by ChoiGyeongJu</div>
			</div>
		</div>
	);
};

export default MainPage;
