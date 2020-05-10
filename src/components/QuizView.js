import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import {
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  makeStyles,
  CircularProgress,
  Grid,
  Link,
  LinearProgress
} from '@material-ui/core';
import Notification from './Notification';
import Selection from './Selection';

import constants from '../constants';

const useStyles = makeStyles((theme) => ({
  card: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  image: {
    width: 'fit-content',
    margin: `${theme.spacing(2)}px auto`,
    borderRadius: '50%'
  },
  paper: {
    paddingTop: '16px'
  },
  progressContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  actions: {
    flexDirection: 'column'
  },
  progress: {
    width: '90%'
  },
  successProgress: {
    width: '90%',
    backgroundColor: 'red'
  },
  successMessage: {
    marginTop: '24px'
  },
  succesMessageHed: {
    color: theme.palette.success.main
  },
  centerLoading: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    minHeight: '307px',
    alignItems: 'center'
  }
}));

function QuizView() {
  const classes = useStyles();

  const [autocompleteDisable, setAutocompleteDisable] = React.useState(false);

  const fetchUsers = useStoreActions((actions) => actions.users.getUsers);
  const nextQuestion = useStoreActions(
    (actions) => actions.questions.incrementCurrentQuestion
  );
  const increaseCorrectAnswers = useStoreActions(
    (actions) => actions.questions.incrementCorrectAnswers
  );
  const increaseIncorrectAnswers = useStoreActions(
    (actions) => actions.questions.incrementIncorrectAnswers
  );

  const { userData } = useStoreState((state) => state.users.data);
  const { currentQuestion, correctCount, incorrectCount } = useStoreState(
    (state) => state.questions
  );

  const toggleNotification = useStoreActions(
    (actions) => actions.notification.toggle
  );
  const setContent = useStoreActions(
    (actions) => actions.notification.setContent
  );

  const progress = (currentQuestion / constants.TOTAL_QUESTIONS) * 100;
  const showSuccessMessage = correctCount >= constants.GOAL;
  const tooManyIncorrect = incorrectCount > constants.INCORRECT_THRESHOLD;

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const handleSelectionChange = (name) => {
    setAutocompleteDisable(true);
    if (name === userData[currentQuestion].name) {
      increaseCorrectAnswers();
      setContent({ severity: 'success', message: 'There you go!' });
    } else {
      increaseIncorrectAnswers();
      setContent({ severity: 'error', message: 'Give it another try.' });
    }
    toggleNotification();
  };

  const handleCloseNotification = () => {
    toggleNotification();
    setAutocompleteDisable(false);
    if (!tooManyIncorrect) {
      nextQuestion();
    }
  };

  return (
    <>
      <Paper elevation={5} className={classes.paper}>
        <Typography variant="h2" align="center" gutterBottom>
          Test your knowledge!
        </Typography>
        {userData ? (
          <Card className={classes.card}>
            <img
              className={classes.image}
              src={userData[currentQuestion].imageUrl}
              alt={userData[currentQuestion].name}
            />
            <CardContent>
              <Grid
                container
                direction="column"
                className={classes.progressContainer}
              >
                <Typography
                  align="center"
                  gutterBottom
                  variant="h6"
                  component="h2"
                >
                  You&apos;ve answered {currentQuestion} out of 50 question/s
                  and {correctCount} are correct.
                </Typography>
                <LinearProgress
                  className={classes.progress}
                  variant="determinate"
                  color={tooManyIncorrect ? 'secondary' : 'primary'}
                  value={progress}
                />
              </Grid>
            </CardContent>
            <CardActions className={classes.actions}>
              {tooManyIncorrect ? (
                <>
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h6"
                    component="h3"
                  >
                    Too many incorrect responses recorded.
                  </Typography>
                  <Typography>
                    Please try again tomorrow! Feel free to use the{' '}
                    <Link href="https://webpagefx.mangoapps.com/sites/peoples/people_directory?limit=20">
                      Mango Directory
                    </Link>{' '}
                    as a study resource.
                  </Typography>
                </>
              ) : (
                <Selection
                  disabled={autocompleteDisable}
                  handleChange={handleSelectionChange}
                />
              )}
            </CardActions>
          </Card>
        ) : (
          <div className={classes.centerLoading}>
            <CircularProgress />
          </div>
        )}
        <Notification handleClose={handleCloseNotification} />
      </Paper>
      {showSuccessMessage && (
        <div className={classes.successMessage}>
          <Typography
            className={classes.succesMessageHed}
            align="center"
            gutterBottom
            variant="h6"
            component="h4"
          >
            Great job!
          </Typography>
          <Typography>
            You&apos;ve tested your FXFamily name knowledge and earned 1
            FXLearns point. Please take a screenshot of this results screen and
            include when you &ldquo;Rate + Return&rdquo; this resource{' '}
            <Link href="https://operationsfx.com/myfx/fxlearns">Here</Link>
          </Typography>
        </div>
      )}
    </>
  );
}

export default React.memo(QuizView);
