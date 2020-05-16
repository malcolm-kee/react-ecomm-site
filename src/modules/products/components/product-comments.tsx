import format from 'date-fns/format';
import React from 'react';
import { Spinner } from '../../../components/spinner';
import { useProductComments } from '../product.queries';
import { ProductCommentForm } from './product-comment-form';

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

type ProductCommentsProps = {
  productId: number;
};

export function ProductComments({ productId }: ProductCommentsProps) {
  const { data: comments } = useProductComments(productId);

  return comments ? (
    <>
      <div className="mb-3">
        {comments.map((comment) => (
          <ProductComment {...comment} key={comment.id} />
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
