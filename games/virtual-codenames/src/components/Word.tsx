import React from 'react';

import Box from '@material-ui/core/Box';

interface WordProps {
  word: string;
}

export default function Word(props: WordProps) {
  return (
    <Box>
      {props.word}
    </Box>
  );
}
