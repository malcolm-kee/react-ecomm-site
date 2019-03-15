import React from 'react';
import { connect } from 'react-redux';
import { Button } from '../../../components/button';
import { Field } from '../../../components/field';
import { Form } from '../../../components/form';
import { Label } from '../../../components/label';
import { Spinner } from '../../../components/spinner';
import { TextField } from '../../../components/text-field';
import { Textarea } from '../../../components/textarea';
import { selectUser } from '../../auth/auth.selectors';
import { submitAddProductComment } from '../product.actions';

function ProductCommentFormContent({ productId, submitForm, user }) {
  const [submitting, setSubmitting] = React.useState(false);
  const [userName, setUserName] = React.useState(user ? user.name : '');
  const [content, setContent] = React.useState('');

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
    <Form title="Add Your Review" onSubmit={handleSubmit}>
      <TextField
        label="Your Name"
        value={userName}
        onChangeValue={setUserName}
        disabled={submitting}
        required
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
        />
      </Field>
      <div>
        {submitting ? (
          <Spinner />
        ) : (
          <Button color="primary" type="submit">
            Add
          </Button>
        )}
      </div>
    </Form>
  );
}

const mapStates = state => ({
  user: selectUser(state)
});

const mapDispatch = {
  submitForm: submitAddProductComment
};

export const ProductCommentForm = connect(
  mapStates,
  mapDispatch
)(ProductCommentFormContent);
