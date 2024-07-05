import React from 'react';
import './Review.scss';

function Review () {
  return (
    <div className='review_container'>
      <div className='review_title'>
        <h1>Review</h1>
        <button>Add review</button>
      </div>
      <div className='review_rate-container'>
      <div className='review_rate'>
          <p>Rate</p>
          <p>Username</p>
        </div>
        <div  className='review_rate-description'>
         <p>Description de la note</p>
        </div>
      </div>
      <div className='review_rate-container'>
      <div className='review_rate'>
          <p>Rate</p>
          <p>Username</p>
        </div>
        <div  className='review_rate-description'>
         <p>Description de la note</p>
        </div>
      </div>
      <div className='review_rate-container'>
        <div className='review_rate'>
          <p>Rate</p>
          <p>Username</p>
        </div>
        <div  className='review_rate-description'>
         <p>Description de la note</p>
        </div>
      </div>
    </div>
);
};

export default Review;