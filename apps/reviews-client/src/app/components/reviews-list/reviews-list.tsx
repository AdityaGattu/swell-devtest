import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import TaskIcon from '@mui/icons-material/Task';
import { ReviewExt } from 'apps/reviews-api/src/reviews/reviews.types';

export interface ReviewsListProps {}

export function ReviewsList(props: ReviewsListProps) {
	const [reviews, setReviews] = useState<ReviewExt[]>([]);
	const [error, setError] = useState('');

	useEffect(() => {
		fetch('/api/reviews')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => setReviews(data.reviews))
			.catch((err) => setError(err.message));
	}, []);

	if (error) {
		return (
			<Alert severity="error" icon={<TaskIcon />}>
				{error}
			</Alert>
		);
	}

	if (reviews.length === 0) {
		return (
			<Alert severity="info" icon={<TaskIcon />}>
				No reviews found.
			</Alert>
		);
	}

	return (
		<div>
			{reviews.map((review) => (
				<div key={review.id}>
					<p>
						{review.user.email} reviewed {review.company.name} on{' '}
						{new Date(review.createdOn).toLocaleDateString()}
					</p>
					<p>Review: {review.reviewText}</p>
					<p>Rating: {review.rating}</p>
				</div>
			))}
		</div>
	);
}

export default ReviewsList;
