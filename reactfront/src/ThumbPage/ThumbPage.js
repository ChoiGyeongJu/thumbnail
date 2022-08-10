/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import './ThumbPage.scss';
import Button from '@mui/material/Button';
import html2canvas from 'html2canvas';

const ThumbPage = () => {
	useEffect(() => {
		// 첫 렌더링때 랜덤 파스텔 배경 설정
		changePastel();
	}, []);

	const handleRGB = () => {
		let color1 = Math.floor(Math.random() * 90 + 1) + 150;
		let color2 = Math.floor(Math.random() * 90 + 1) + 150;
		let color3 = Math.floor(Math.random() * 90 + 1) + 150;
		let tmp = [color1, color2, color3];
		return tmp;
	};

	const changePastel = () => {
		// 랜덤 파스텔 배경 설정 함수
		let color1 = handleRGB();
		let color2 = handleRGB();
		const body = document.getElementById('body');
		const thumb = document.getElementById('thumb');
		body.style.background = `linear-gradient( rgb(${color1[0]}, ${color1[1]}, ${color1[2]}), rgb(${color2[0]}, ${color2[1]}, ${color2[2]}))`;
		thumb.style.background = `linear-gradient( rgb(${color1[0]}, ${color1[1]}, ${color1[2]}), rgb(${color2[0]}, ${color2[1]}, ${color2[2]}))`;
	};

	const changeColor = () => {
		// 랜덤 단색 배경 설정 함수
		let color = handleRGB();
		const body = document.getElementById('body');
		const thumb = document.getElementById('thumb');
		body.style.background = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
		thumb.style.background = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
	};

	const imageInput = useRef();
	const ImageUpload = () => {
		// 배경 이미지 설정 함수
		imageInput.current.click();
	};

	const handleBackgroundImg = e => {
		const body = document.getElementById('body');
		const thumb = document.getElementById('thumb');
		const { name, files } = e.target;
		const reader = new FileReader();

		reader.readAsDataURL(files[0]);
		reader.onload = () => {
			console.log(reader);
			body.style.background = `rgb(148 148 148)`;
			thumb.style.background = `url(${reader.result}) center center / cover no-repeat`;
		};
	};

	const [title1, setTitle1] = useState('제목을 입력하세요.');
	const [title2, setTitle2] = useState('부제를 입력하세요.');
	const [title3, setTitle3] = useState('분류를 입력하세요.');

	const handleTitle1 = e => {
		setTitle1(e.target.value);
	};
	const handleTitle2 = e => {
		setTitle2(e.target.value);
	};
	const handleTitle3 = e => {
		setTitle3(e.target.value);
	};

	const [SelectedComp, setSelectedComp] = useState(1);

	const ChooseComp1 = () => {
		let thumbTitle2 = document.getElementById('thumb-title2');
		let thumbTitle3 = document.getElementById('thumb-title3');
		thumbTitle2.style.display = ``;
		thumbTitle3.style.display = ``;
		thumbTitle3.style.marginTop = `7rem`;
		setSelectedComp(1);
	};
	const ChooseComp2 = () => {
		let thumbTitle2 = document.getElementById('thumb-title2');
		let thumbTitle3 = document.getElementById('thumb-title3');
		thumbTitle2.style.display = `none`;
		thumbTitle3.style.display = ``;
		thumbTitle3.style.marginTop = `11rem`;
		setSelectedComp(2);
	};
	const ChooseComp3 = () => {
		let thumbTitle2 = document.getElementById('thumb-title2');
		let thumbTitle3 = document.getElementById('thumb-title3');
		thumbTitle2.style.display = `none`;
		thumbTitle3.style.display = `none`;
		setSelectedComp(3);
	};

	const handleTextColor = () => {
		let thumb = document.getElementById('thumb');
		let borderLine = document.getElementById('thumb-title2');
		if (thumb.style.color === `black`) {
			thumb.style.color = `white`;
			borderLine.style.borderTop = `2px solid white`;
		} else {
			thumb.style.color = `black`;
			borderLine.style.borderTop = `2px solid black`;
		}
	};

	const handleShadow = () => {
		let thumb = document.getElementById('thumb');
		if (thumb.style.textShadow === ``) {
			thumb.style.textShadow = `rgb(0 0 0 / 40%) 2px 2px 4px`;
		} else {
			thumb.style.textShadow = ``;
		}
	};

	const handleTextSize = () => {
		let title1 = document.getElementById('thumb-title1');
		let title2 = document.getElementById('thumb-title2');
		let title3 = document.getElementById('thumb-title3');
		if (title1.style.fontSize === `2.68rem`) {
			title1.style.fontSize = `2.4rem`;
			title2.style.fontSize = `1.4rem`;
			title3.style.fontSize = `0.9rem`;
		} else {
			title1.style.fontSize = `2.68rem`;
			title2.style.fontSize = `1.5rem`;
			title3.style.fontSize = `1.1rem`;
		}
	};

	const reset = () => {
		// 설정 초기화
		ChooseComp1();
		changePastel();
		setTitle1('제목을 입력하세요.');
		setTitle2('부제를 입력하세요.');
		setTitle3('분류를 입력하세요.');
		let thumb = document.getElementById('thumb');
		let borderLine = document.getElementById('thumb-title2');
		let title1 = document.getElementById('thumb-title1');
		if (title1.style.fontSize === `2.68rem`) {
		} else {
			handleTextSize();
		}
		thumb.style.color = `black`;
		borderLine.style.borderTop = `2px solid black`;
	};

	const onSave = () => {
		if (window.confirm('저장하시겠습니까?')) {
			if (window.confirm('다른 이용자들이 볼 수 있게 수락하시겠습니까?')) {
				onCapture(true);
				console.log('예');
			} else {
				onCapture(false);
				console.log('아니오');
			}
		} else {
			// alert('취소합니다.');
		}
	};

	const onCapture = isvalid => {
		// html2canvas 사용하여 캡처 후 생성한 a태그로 다운로드
		html2canvas(document.getElementById('thumb')).then(canvas => {
			onSaveAs(canvas.toDataURL('image/png'), 'thumbnail_maker.png', isvalid);
		});
	};

	const onSaveAs = (uri, filename, isvalid) => {
		// a tag 생성하여 다운로드
		let link = document.createElement('a');
		document.body.appendChild(link);
		link.href = uri;
		link.download = filename;
		link.click();
		const formData = new FormData();
		formData.append('encoded_image', link.href);
		if (isvalid === true) {
			formData.append('is_valid', 1);
		} else {
			formData.append('is_valid', 0);
		}
		fetch(`http://3.37.40.39/test/upload-thumb`, {
			method: 'POST',
			body: formData,
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				if (data.messsage === 'success') {
					// alert('성공');
				} else {
					// alert('실패');
				}
			});
		document.body.removeChild(link);
	};

	return (
		<div id="body" className="thumb-container">
			<div className="task-container">
				<div className="title">Thumbnail Maker</div>
				<div id="thumb" className="thumbnail">
					<div id="thumb-title1" className="thumb-title1">
						{title1}
					</div>
					<div id="thumb-title2" className="thumb-title2">
						{title2}
					</div>
					<div id="thumb-title3" className="thumb-title3">
						{title3}
					</div>
				</div>
				<div className="input-box">
					<input placeholder="제목을 입력하세요." onChange={handleTitle1} />
					<input placeholder="부제를 입력하세요." onChange={handleTitle2} />
					<input placeholder="분류를 입력하세요." onChange={handleTitle3} />
				</div>
				<div className="setting">
					<div className="menu-title">배경</div>
					<div onClick={changePastel} className="select-box">
						<div>랜덤 파스텔</div>
					</div>
					<div onClick={changeColor} className="select-box">
						<div>랜덤 단색</div>
					</div>
					<div onClick={ImageUpload} className="select-box">
						<input
							onChange={handleBackgroundImg}
							ref={imageInput}
							type="file"
							accept="image/*"
							style={{ display: 'none' }}
						/>
						<div>Upload Image</div>
					</div>
				</div>
				<div className="setting">
					<div className="menu-title">구성 요소</div>
					<div
						id="comp1"
						onClick={ChooseComp1}
						className={SelectedComp === 1 ? 'selected-box' : 'select-box'}
					>
						<div>제목/부제/분류</div>
					</div>
					<div
						id="comp2"
						onClick={ChooseComp2}
						className={SelectedComp === 2 ? 'selected-box' : 'select-box'}
					>
						<div>제목/분류</div>
					</div>
					<div
						id="comp3"
						onClick={ChooseComp3}
						className={SelectedComp === 3 ? 'selected-box' : 'select-box'}
					>
						<div>제목</div>
					</div>
				</div>
				<div className="setting">
					<div className="menu-title">텍스트</div>
					<div onClick={handleTextColor} className="select-box">
						<div>색상 반전</div>
					</div>
					<div onClick={handleShadow} className="select-box">
						<div>그림자</div>
					</div>
					<div onClick={handleTextSize} className="select-box">
						<div>글자 크기</div>
					</div>
				</div>
				<div className="final-box">
					<div className="button">
						<Button onClick={reset} variant="outlined">
							초기화
						</Button>
					</div>
					<div className="button">
						<Button onClick={onSave} variant="outlined">
							저장하기
						</Button>
					</div>
				</div>
			</div>
			<div className="mobile">
				원활한 이용을 위해
				<br /> pc 또는 태블릿을 이용해주세요
			</div>
		</div>
	);
};

export default ThumbPage;
