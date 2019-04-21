const React = require('react');

const FakeTransition = jest.fn(({ children, className }) =>
  React.cloneElement(children, { className })
);

const FakeCSSTransition = jest.fn(
  ({
    in: show,
    timeout,
    classNames: { enterDone, exitDone } = {},
    ...props
  } = {}) =>
    show
      ? React.createElement(
          FakeTransition,
          Object.assign({}, props, {
            className: enterDone
          }),
          props.children
        )
      : React.createElement(
          FakeTransition,
          Object.assign(
            {},
            props,
            {
              className: exitDone
            },
            props.children
          )
        )
);

module.exports = {
  CSSTransition: FakeCSSTransition,
  Transition: FakeTransition
};
