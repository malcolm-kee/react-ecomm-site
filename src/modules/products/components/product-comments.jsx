import format from 'date-fns/format';
import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../../../components/spinner';
import { loadProductComments } from '../product.actions';
import { selectProductComments } from '../product.selectors';
import { ProductCommentForm } from './product-comment-form';

function ProductComment({ userName, content, createdOn }) {
  return (
    <div className="py-2">
      <div className="product-comment-info">
        <strong>{userName}</strong> reviewed on{' '}
        {format(new Date(createdOn), 'DD MMM YY')}
      </div>
      <div className="whitespace-pre-wrap">
        <p>{content}</p>
      </div>
    </div>
  );
}

function ProductCommentsContent({ productId, loadComments, comments }) {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (comments.length === 0) {
      setIsLoading(true);
      loadComments().then(() => setIsLoading(false));
    }
  }, [productId, comments.length, loadComments]);

  return (
    <>
      {isLoading && <Spinner />}
      <div className="mb-3">
        {comments.map(comment => (
          <ProductComment {...comment} key={comment.id} />
        ))}
        {!isLoading && comments.length === 0 && (
          <p>There is no review for this product yet.</p>
        )}
      </div>
      <ProductCommentForm productId={productId} />
    </>
  );
}

const mapStates = (state, ownProps) => ({
  comments: selectProductComments(state, ownProps.productId) || [],
});

const mapDispatch = (dispatch, ownProps) => ({
  loadComments: () => dispatch(loadProductComments(ownProps.productId)),
});

export const ProductComments = connect(
  mapStates,
  mapDispatch
)(ProductCommentsContent);

export default ProductComments;
