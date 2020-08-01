import { Spinner } from 'components/spinner';
import format from 'date-fns/format';
import * as React from 'react';
import { ProductComment } from '../product.type';
import { ProductCommentForm } from './product-comment-form';

function Comment({
  userName,
  content,
  createdAt,
}: {
  userName: string;
  content: string;
  createdAt: string;
}) {
  return (
    <div className="py-2">
      <div className="product-comment-info">
        <strong>{userName}</strong> reviewed on{' '}
        {format(new Date(createdAt), 'd MMM yyyy')}
      </div>
      <div className="whitespace-pre-wrap">
        <p>{content}</p>
      </div>
    </div>
  );
}

type ProductCommentsProps = {
  productId: string;
  comments: ProductComment[];
};

function ProductComments({ productId, comments }: ProductCommentsProps) {
  return comments ? (
    <>
      <div className="mb-3">
        {comments.map((comment) => (
          <Comment {...comment} key={comment._id} />
        ))}
        {comments.length === 0 && (
          <p>There is no review for this product yet.</p>
        )}
      </div>
      <ProductCommentForm productId={productId} />
    </>
  ) : (
    <Spinner />
  );
}

export default ProductComments;
