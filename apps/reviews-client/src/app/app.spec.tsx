import { render } from '@testing-library/react';
import App from './app';
global.fetch = require('node-fetch');

describe('App', () => {
	it('should render successfully', () => {
		const { baseElement } = render(<App />);

		expect(baseElement).toBeTruthy();
	});
});
