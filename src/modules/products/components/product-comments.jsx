import format from 'date-fns/format';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { Spinner } from '../../../components/spinner';
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
      loadComments(productId).then(() => setIsLoading(false));
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
