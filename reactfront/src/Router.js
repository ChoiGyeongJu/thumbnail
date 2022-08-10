import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './MainPage/MainPage.js';
import ThumbPage from './ThumbPage/ThumbPage.js';

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/thumb" element={<ThumbPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
