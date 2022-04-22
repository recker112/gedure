import React from "react";
import { Checkbox } from "@mui/material";

export const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <Checkbox
        type="checkbox"
        ref={resolvedRef}
        indeterminate={indeterminate}
        color={indeterminate ? 'default' : 'primary'}
        {...rest} />
    );
  }
);
