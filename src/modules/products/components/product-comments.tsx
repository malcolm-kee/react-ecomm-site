import format from 'date-fns/format';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Spinner } from '../../../components/spinner';
import { RootState, ThunkDispatch } from '../../../type';
import { loadProductComments } from '../product.actions';
import { selectProductComments } from '../product.selectors';
import { ProductCommentForm } from './product-comment-form';
import './product-comments.css';

function ProductComment({
  userName,
  content,
  createdOn,
}: {
  userName: string;
  content: string;
  createdOn: number;
}) {
  return (
    <div className="product-comment">
      <div className="product-comment-info">
        <strong>{userName}</strong> reviewed on{' '}
        {format(new Date(createdOn), 'DD MMM YY')}
      </div>
      <div className="product-comment-content">
        <p>{content}</p>
      </div>
    </div>
  );
}

type ProductCommentsProps = {
  productId: number;
};

type ReduxProps = ConnectedProps<typeof connector>;

function ProductCommentsContent({
  productId,
  loadComments,
  comments,
}: ProductCommentsProps & ReduxProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (comments.length === 0) {
      setIsLoading(true);
      loadComments().then(() => setIsLoading(false));
    }
  }, [productId, comments.length, loadComments]);

  return (
    <div>
      {isLoading && <Spinner />}
      {comments.map(comment => (
        <ProductComment {...comment} key={comment.id} />
      ))}
      {!isLoading && comments.length === 0 && (
        <p>There is no review for this product yet.</p>
      )}
      <ProductCommentForm productId={productId} />
    </div>
  );
}

const mapStates = (state: RootState, ownProps: ProductCommentsProps) => ({
  comments: selectProductComments(state, ownProps.productId) || [],
});

const mapDispatch = (
  dispatch: ThunkDispatch,
  ownProps: ProductCommentsProps
) => ({
  loadComments: () => dispatch(loadProductComments(ownProps.productId)),
});

const connector = connect(mapStates, mapDispatch);

export const ProductComments = connector(ProductCommentsContent);

export default ProductComments;
