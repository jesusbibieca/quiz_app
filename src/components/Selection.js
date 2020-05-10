import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { useStoreState } from 'easy-peasy';

function Selection({ handleChange, disabled }) {
  const { names } = useStoreState((state) => state.users.data);
  const { currentQuestion } = useStoreState((state) => state.questions);

  return (
    <Autocomplete
      id="quiz-name-select"
      key={names[currentQuestion]}
      options={names}
      disabled={disabled}
      fullWidth
      autoHighlight
      renderInput={(params) => (
        <TextField
          {...params}
          label="What's your co-worker's name?"
          variant="outlined"
          inputProps={{
            ...params.inputProps
          }}
        />
      )}
      onChange={(_, selection) => handleChange(selection)}
    />
  );
}

Selection.propTypes = {
  handleChange: PropTypes.func,
  disabled: PropTypes.bool
};

export default Selection;
