import React from 'react';
import { StoreProvider } from 'easy-peasy';
import {
  ThemeProvider,
  Typography,
  makeStyles,
  Divider,
  Link
} from '@material-ui/core';

import theme from '../theme';
import quizStore from '../store';

import Layout from './Layout';
import QuizView from './QuizView';

const useStyles = makeStyles((theme) => ({
  additionalMargin: {
    margin: '16px 0'
  },
  highlight: {
    color: theme.palette.secondary.main
  },
  quiz: {
    marginTop: '16px'
  },
  divider: {
    margin: '16px 60px'
  }
}));

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Typography
          className={classes.additionalMargin}
          align="center"
          variant="h1"
        >
          FXFamily Member Quiz
        </Typography>
        <Typography variant="body1">
          Test your knowledge of our{' '}
          <span className={classes.highlight}>#BestCoworkers&apos; </span>
          names using this picture quiz!
          <br />
          You&apos;ll be shown 50 different randomized profile images and asked
          to correctly identify at least <b>40</b>.
          <br />
          We trust that you will not use any references during the quiz!
        </Typography>
        <Divider className={classes.divider} variant="middle" />
        <Typography className={classes.additionalMargin}>
          Looking for ways to practice? Follow these ProTips!
          <br />- Study using the{' '}
          <span className={classes.highlight}>Liveboard</span> by selecting
          someone&apos;s name to see their profile image.
          <br />
          See that person on FXCampus? Greet them using their first name!
          <br />- Link Liveboard to{' '}
          {<Link href="https://operationsfx.com/liveboard">HERE!</Link>}
        </Typography>
        <StoreProvider store={quizStore}>
          <QuizView className={classes.quiz} />
        </StoreProvider>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
