export type FieldStatus = 'warning' | 'error' | 'success';

/**
 * Params to be injected to `renderContainer` props.
 *
 * `renderContainer` is used instead of `as` props to allow proper typechecking.
 *
 * For detailed analysis, see https://blog.andrewbran.ch/polymorphic-react-components/.
 */
export type ContainerProps = {
  className: string;
  children?: React.ReactNode;
};
