import * as React from 'react';
import { toast } from 'react-toastify';
import { Button } from '../../../components/button';
import { Field } from '../../../components/field';
import { Form } from '../../../components/form';
import { Label } from '../../../components/label';
import { SelectField } from '../../../components/select-field';
import { Spinner } from '../../../components/spinner';
import { TextField } from '../../../components/text-field';
import { Textarea } from '../../../components/textarea';
import { scrollIntoView } from '../../../lib/scroll-into-view';
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
      onSubmit={ev => {
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
      <h2>Make a Complaint</h2>
      <ComplainFormSection>
        <fieldset>
          <legend>Category</legend>
          <SelectField label="I want to make complain about" required>
            <option value="product">Product</option>
            <option value="deliver">Delivery</option>
            <option value="scam">Scam</option>
          </SelectField>
        </fieldset>
      </ComplainFormSection>
      {currentPage >= 1 && (
        <ComplainFormSection>
          <fieldset>
            <legend>Details</legend>
            <Field>
              <Label>Date of incident</Label>
              <DateInput autoFocus />
            </Field>
            <Field>
              <Label>Details about the incident</Label>
              <Textarea
                placeholder="Please provide as much details as possible"
                required
              />
            </Field>
          </fieldset>
        </ComplainFormSection>
      )}
      {currentPage >= 2 && (
        <ComplainFormSection>
          <fieldset>
            <legend>Contacts</legend>
            <TextField
              label="Your Full Name"
              placeholder="Tony Stark"
              required
              autoFocus
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
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    scrollIntoView(sectionRef.current);
  }, []);

  return (
    <section ref={sectionRef}>
      <React.Suspense fallback={<Spinner />}>{props.children}</React.Suspense>
    </section>
  );
};
