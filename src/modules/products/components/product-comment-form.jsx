import { inject, observer } from 'mobx-react';
import React from 'react';
import { Button } from '../../../components/button';
import { Field } from '../../../components/field';
import { Form } from '../../../components/form';
import { Label } from '../../../components/label';
import { Spinner } from '../../../components/spinner';
import { TextField } from '../../../components/text-field';
import { Textarea } from '../../../components/textarea';

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
      createdOn: Date.now(),
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

export const ProductCommentForm = inject(({ auth, product }) => ({
  auth,
  product,
}))(
  observer(function ProductCommentForm({
    auth: { user },
    product: { createProductComment },
    ...restProps
  }) {
    return (
      <ProductCommentFormContent
        user={user}
        submitForm={createProductComment}
        {...restProps}
      />
    );
  })
);
