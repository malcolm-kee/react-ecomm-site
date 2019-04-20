import React from 'react';
import { waitForElement, fireEvent } from 'react-testing-library';
import { renderWithMobXAndRouter } from '../lib/test-util';
import { ProductPage } from './product-page';

describe('<ProductPage />', () => {
  function loadProductPage() {
    const renderResult = renderWithMobXAndRouter(<ProductPage productId="1" />);

    const { getByText, getByLabelText, getByTestId } = renderResult;

    return {
      ...renderResult,
      getAddToCartBtn: () => getByText('Add To Cart'),
      getCommentNameInput: () => getByLabelText('Your Name'),
      inputCommentorName: name =>
        fireEvent.change(getByLabelText('Your Name'), {
          target: { value: name }
        }),
      inputComment: comment =>
        fireEvent.change(getByLabelText('Your Review'), {
          target: { value: comment }
        }),
      submitComment: () =>
        fireEvent.click(getByTestId('product-comment-submit-btn'))
    };
  }

  it('allows customer to add product to cart', async () => {
    const { getAddToCartBtn } = loadProductPage();

    const addToCartBtn = await waitForElement(() => getAddToCartBtn());

    fireEvent.click(addToCartBtn);
  });

  it('allows customer to add comment', async () => {
    const {
      getCommentNameInput,
      inputCommentorName,
      inputComment,
      submitComment
    } = loadProductPage();

    await waitForElement(() => getCommentNameInput());

    inputCommentorName('Malcolm Kee');
    inputComment('I like it');
    submitComment();
  });
});
