// @ts-nocheck
/**
 * React Aria Element
 * See: https://react-spectrum.adobe.com/react-aria/useDateField.html
 *
 * Notes: Need to disable TS & ESlint rules to keep original component
 */

import { createCalendar } from '@internationalized/date';
import { forwardRef, useRef } from 'react';
import { useDateField, useDateSegment, useLocale } from 'react-aria';
import { useDateFieldState } from 'react-stately';

import '../styles/DateField.scss';

type DateFieldProps = {
  hourCycle: number;
  hideTimeZone: boolean;
};

const DateSegment = ({ segment, state }) => {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={`segment ${segment.isPlaceholder ? 'placeholder' : ''}`}
    >
      {segment.text}
    </div>
  );
};

export const DateField = forwardRef((props: DateFieldProps, ref) => {
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const { labelProps, fieldProps } = useDateField(props, state, ref);

  return (
    <div className="wrapper">
      <span {...labelProps}>{props.label}</span>
      <div {...fieldProps} ref={ref} className="field">
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
        {state.validationState === 'invalid' && (
          <span aria-hidden="true"></span>
        )}
      </div>
    </div>
  );
});
