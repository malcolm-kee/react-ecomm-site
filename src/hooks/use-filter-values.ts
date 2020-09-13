import * as React from 'react';

export const useFilter = <T>(initialValues: T) => {
  const [state, dispatch] = React.useReducer(
    filterReducer as any,
    initialValues,
    getInitialState
  );
  const stateValue = (state as any) as FilterState<T, keyof T>;
  const dispatchAction = dispatch as React.Dispatch<Action<T, keyof T>>;

  const result = React.useMemo(() => {
    return {
      values: stateValue.values,
      applied: stateValue.applied.map((item) => ({
        ...item,
        resetValue: () =>
          dispatchAction({
            type: 'resetValue',
            payload: item.prop,
          }),
      })),
    };
  }, [stateValue.values, stateValue.applied, dispatchAction]);

  const actions = React.useMemo(
    () => ({
      setValue: <Prop extends keyof T>(
        prop: Prop,
        value: T[Prop],
        label = String(value)
      ) =>
        dispatchAction({
          type: 'setValue',
          payload: {
            prop,
            value,
            label,
          },
        }),
      setValueCurry: <Prop extends keyof T>(prop: Prop) => (
        value: T[Prop],
        label = String(value)
      ) =>
        dispatchAction({
          type: 'setValue',
          payload: {
            prop,
            value,
            label,
          },
        }),
      reset: () =>
        dispatchAction({
          type: 'reset',
        }),
    }),
    [dispatchAction]
  );

  return [result, actions] as const;
};

type FilterState<Values, Prop extends keyof Values> = {
  initial: Values;
  values: Values;
  applied: Array<{
    prop: Prop;
    value: Values[Prop];
    label: string;
  }>;
};

const getInitialState = <T, Prop extends keyof T>(
  initialValues: T
): FilterState<T, Prop> => {
  return {
    initial: initialValues,
    values: initialValues,
    applied: [],
  };
};

type Action<T, Prop extends keyof T> =
  | {
      type: 'setValue';
      payload: {
        prop: Prop;
        value: T[Prop];
        label: string;
      };
    }
  | {
      type: 'resetValue';
      payload: Prop;
    }
  | {
      type: 'reset';
    };

const filterReducer = <T, Prop extends keyof T>(
  state: FilterState<T, Prop>,
  action: Action<T, Prop>
): FilterState<T, Prop> => {
  switch (action.type) {
    case 'setValue': {
      const { prop, value, label } = action.payload;

      const nextApplied = state.applied.slice();

      const currentIndex = nextApplied.findIndex(
        (applied) => applied.prop === prop
      );

      if (currentIndex > -1) {
        if (state.initial[prop] === value) {
          nextApplied.splice(currentIndex, 1);
        } else {
          nextApplied[currentIndex].value = value;
          nextApplied[currentIndex].label = label;
        }
      } else {
        nextApplied.push(action.payload);
      }

      return {
        ...state,
        values: {
          ...state.values,
          [prop]: value,
        },
        applied: nextApplied,
      };
    }

    case 'resetValue': {
      const prop = action.payload;

      if (state.values[prop] === state.initial[prop]) {
        return state;
      }

      const nextApplied = state.applied.slice();
      nextApplied.splice(
        nextApplied.findIndex((item) => item.prop === prop),
        1
      );

      return {
        ...state,
        values: {
          ...state.values,
          [prop]: state.initial[prop],
        },
        applied: nextApplied,
      };
    }

    case 'reset':
      return {
        ...state,
        values: state.initial,
        applied: [],
      };

    default:
      return state;
  }
};
