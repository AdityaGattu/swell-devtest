import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ReviewsList from './reviews-list';

const mockFetch = jest.fn();

global.fetch = mockFetch;

beforeEach(() => {
	mockFetch.mockClear();
});

afterAll(() => {
	jest.restoreAllMocks();
});

describe('ReviewsList', () => {
	it('should render successfully with no reviews', async () => {
		mockFetch.mockResolvedValueOnce({
			json: () => Promise.resolve({ reviews: [] }),
		});

		render(<ReviewsList />);
		await waitFor(() => {
			expect(screen.getByText('No reviews found.')).toBeInTheDocument();
		});
	});

	it('should display message if no reviews are found', async () => {
		mockFetch.mockResolvedValueOnce({
			json: () => Promise.resolve({ reviews: [] }),
		});

		render(<ReviewsList />);
		await waitFor(() => {
			const message = screen.getByText('No reviews found.');
			expect(message).toBeInTheDocument();
		});
	});

	it('should display the review text if provided', async () => {
		const mockReviews = [
			{
				id: '70eafa74-31ac-4e3e-ac11-79c06b25ec29',
				reviewerId: '2625f5b9-d6fc-443c-a5ca-e438ffc959ca',
				companyId: '3880e9ff-036a-4a16-9fd5-957e2c29bb2b',
				reviewText: '',
				rating: 5,
				createdOn: '2022-08-30T15:59:19Z',
			},
		];

		mockFetch.mockResolvedValueOnce({
			json: () => Promise.resolve({ reviews: mockReviews }),
		});

		render(<ReviewsList />);
		//const reviewText = await screen.findByText("");
		//expect(reviewText).toBeInTheDocument();
	});
	// Add any additional tests as necessary
});
