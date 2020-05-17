import { Button } from 'components/button';
import { Field } from 'components/field';
import { Form } from 'components/form';
import { Label } from 'components/label';
import { Spinner } from 'components/spinner';
import { TextField } from 'components/text-field';
import { Textarea } from 'components/textarea';
import * as React from 'react';
import { connect } from 'react-redux';
import { selectUser } from '../../auth/auth.selectors';
import { submitAddProductComment } from '../product.actions';

function ProductCommentFormContent({ productId, submitForm, user }) {
  const defaultName = (user && user.name) || '';
  const [submitting, setSubmitting] = React.useState(false);
  const [userName, setUserName] = React.useState(user ? user.name : '');
  const [content, setContent] = React.useState('');
  const nameInputRef = React.useRef(null);
  const contentInputRef = React.useRef(null);

  function handleSubmit(ev) {
    ev.preventDefault();
    setSubmitting(true);
    submitForm({
      userName,
      content,
      productId,
      createdOn: Date.now(),
    }).then(() => {
      setSubmitting(false);
      setContent('');
      setUserName(defaultName);
      if (defaultName) {
        contentInputRef.current && contentInputRef.current.focus();
      } else {
        nameInputRef.current && nameInputRef.current.focus();
      }
    });
  }

  return (
    <Form title="Add Your Review" onSubmit={handleSubmit}>
      <TextField
        label="Your Name"
        value={userName}
        onChangeValue={setUserName}
        disabled={submitting}
        required
        ref={nameInputRef}
      />
      <Field>
        <Label>Your Review</Label>
        <Textarea
          id="product-comment-form-content"
          value={content}
          onChangeValue={setContent}
          minRows={3}
          disabled={submitting}
          required
          ref={contentInputRef}
        />
      </Field>
      <div>
        {submitting ? (
          <Spinner />
        ) : (
          <Button
            color="primary"
            type="submit"
            data-testid="product-comment-submit-btn"
          >
            Add
          </Button>
        )}
      </div>
    </Form>
  );
}

const mapStates = (state) => ({
  user: selectUser(state),
});

const mapDispatch = {
  submitForm: submitAddProductComment,
};

export const ProductCommentForm = connect(
  mapStates,
  mapDispatch
)(ProductCommentFormContent);
