import React from 'react';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import { Spinner } from '../../../components/spinner';
import { submitAddProductComment } from '../product.actions';

function ProductCommentFormContent({ productId, submitForm }) {
  const [submitting, setSubmitting] = React.useState(false);
  const [content, setContent] = React.useState('');
  const [userName, setUserName] = React.useState('');

  function handleSubmit(ev) {
    ev.preventDefault();
    setSubmitting(true);
    submitForm({
      userName,
      content,
      productId,
      createdOn: Date.now()
    }).then(() => {
      setSubmitting(false);
      setContent('');
      setUserName('');
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <legend>Add Your Review</legend>
      <div className="form-group">
        <label htmlFor="product-comment-form-content">Your Review</label>
        <Textarea
          id="product-comment-form-content"
          className="form-control"
          value={content}
          onChange={ev => setContent(ev.target.value)}
          minRows={3}
          disabled={submitting}
          required
        />
      </div>
      <div className="form-group">
        <label>Your Name</label>
        <input
          className="form-control"
          value={userName}
          onChange={ev => setUserName(ev.target.value)}
          disabled={submitting}
          required
        />
      </div>
      <div>
        {submitting ? (
          <Spinner />
        ) : (
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        )}
      </div>
    </form>
  );
}

const mapDispatch = {
  submitForm: submitAddProductComment
};

export const ProductCommentForm = connect(
  null,
  mapDispatch
)(ProductCommentFormContent);
