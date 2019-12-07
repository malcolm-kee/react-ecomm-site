import format from 'date-fns/format';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Spinner } from '../../../components/spinner';
import { ProductCommentForm } from './product-comment-form';
import './product-comments.css';

function ProductComment({ userName, content, createdOn }) {
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

function ProductCommentsContent({ productId, loadComments, comments }) {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (comments.length === 0) {
      setIsLoading(true);
      loadComments(productId).then(() => setIsLoading(false));
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

export const ProductComments = inject('product')(
  observer(function ProductComments({
    product: { getProductComments, loadProductComments },
    productId,
  }) {
    return (
      <ProductCommentsContent
        productId={productId}
        comments={getProductComments(productId)}
        loadComments={loadProductComments}
      />
    );
  })
);

export default ProductComments;
