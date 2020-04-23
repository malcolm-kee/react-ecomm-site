import * as React from 'react';
import { toast } from 'react-toastify';
import { Button } from '../../../components/button';
import { Field } from '../../../components/field';
import { FileUpload } from '../../../components/file-upload';
import { Form } from '../../../components/form';
import { Label } from '../../../components/label';
import { SelectField } from '../../../components/select-field';
import { Spinner } from '../../../components/spinner';
import { TextField } from '../../../components/text-field';
import { Textarea } from '../../../components/textarea';
import { useScrollOnMount } from '../../../hooks/use-scroll-on-mount';
import styles from './complain-form.module.scss';

const DateInput = React.lazy(() =>
  import('../../../components/date-input-default')
);

const TOTAL_PAGE = 2;

export const ComplainForm = () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const isLastPage = currentPage >= TOTAL_PAGE;

  return (
    <Form
      onSubmit={(ev) => {
        ev.preventDefault();
        if (!isLastPage) {
          setCurrentPage(currentPage + 1);
        } else {
          toast(`Something goes wrong. Must be your fault.`, {
            type: 'error',
            autoClose: 3000,
          });
        }
      }}
      className={styles.root}
    >
      <h2 className="text-2xl mb-2">Make a Complaint</h2>
      <ComplainFormSection>
        <fieldset className="py-3">
          <legend className="text-lg">Category</legend>
          <SelectField label="I want to make complain about" required>
            <option value="product">Product</option>
            <option value="deliver">Delivery</option>
            <option value="scam">Scam</option>
          </SelectField>
        </fieldset>
      </ComplainFormSection>
      {currentPage >= 1 && (
        <React.Suspense fallback={<Spinner />}>
          <ComplainFormSection>
            <fieldset className="py-3">
              <legend className="text-lg">Details</legend>
              <Field>
                <Label>Date of incident</Label>
                <DateInput id="incident-date" />
              </Field>
              <Field>
                <Label>Details about the incident</Label>
                <Textarea
                  placeholder="Please provide as much details as possible"
                  required
                />
              </Field>
              <Field>
                <Label>Supporting Documents (if any)</Label>
                <FileUpload />
              </Field>
            </fieldset>
          </ComplainFormSection>
        </React.Suspense>
      )}
      {currentPage >= 2 && (
        <ComplainFormSection>
          <fieldset className="py-3">
            <legend className="text-lg">Contacts</legend>
            <TextField
              label="Your Full Name"
              placeholder="Tony Stark"
              required
            />
            <TextField label="Your Phone Number" type="phone" required />
          </fieldset>
        </ComplainFormSection>
      )}
      <div>
        <Button color={isLastPage ? 'success' : 'info'} type="submit">
          {isLastPage ? 'Submit' : 'Next'}
        </Button>
      </div>
    </Form>
  );
};

const ComplainFormSection = (props: { children: React.ReactNode }) => {
  const sectionRef = useScrollOnMount();

  return <section ref={sectionRef}>{props.children}</section>;
};
