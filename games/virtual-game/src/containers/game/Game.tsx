import React from 'react';
import { RouteComponentProps } from 'react-router';
import { withFirebase, FirebaseProps } from '../../components/Firebase';

import Button from '@material-ui/core/Button';

import { GameState } from '@virtualboardgame/core';
import { games } from '../../constants/games';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import BackIcon from '@material-ui/icons/ArrowBack';
import MenuIcon from '@material-ui/icons/Menu';
import ShareIcon from '@material-ui/icons/ScreenShare';

import Games from './Games';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      // position: 'relative',
    },
    main: {
      position: 'absolute',
      width: '100%',
      height: 'calc(100vh - 48px)',
      // overflow: 'hidden'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    grow: {
      flexGrow: 1,
    },
    title: {
      textAlign: 'left',
    },
  }),
);

interface GameProps extends RouteComponentProps, FirebaseProps {
}

interface GameComponentState {
  loading: boolean;
  newGame: boolean;
  gameState: GameState;
}

function GameComponent(props: GameProps) {
  const classes = useStyles();

  const { match: { params } } = props;
  const gameId = (params as any).roomId;

  const [state, setState] = React.useState({
    loading: true,
    newGame: false,
    gameState: {} as GameState
  } as GameComponentState);
  const { newGame, loading, gameState } = state;
  const { game, id } = gameState;

  const [chooseGame, setChooseGame] = React.useState(true);
  const [shareOpen, setShareOpen] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = props.firebase!
      .game(gameId)
      .onSnapshot(doc => {
        if (!doc.exists) {
          setState({
            loading: false,
            newGame: true,
            gameState: {}
          })
          setChooseGame(true);
          return;
        }

        const gameState = doc.data() as GameState;
        setState({
          loading: false,
          newGame: false,
          gameState
        });
        setChooseGame(false);
      });
    return () => {
      unsubscribe();
    }
  }, [gameId, props.firebase]);

  const setGameState = (gameState: GameState, overwrite?: boolean) => {
    // Save to firebase
    const gameRecord = props.firebase!.game(gameId);
    gameRecord.set(gameState, { merge: !overwrite });
  }

  const handleClickOpen = () => {
    setChooseGame(true);
  };

  const handleClose = () => {
    setChooseGame(false);
  };

  const handeNewGame = () => {
    setState({
      newGame: true,
      loading: false,
      gameState: {
        game
      }
    })
  };

  const setGame = (game: string) => {
    setState({
      newGame: true,
      loading: false,
      gameState: {
        game
      }
    })
    setChooseGame(false);
  }

  if (loading) return <div />;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton edge="start" onClick={handleClickOpen} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" color="inherit" className={classes.title}>
            {gameId}
          </Typography> */}
          <IconButton aria-label="share" color="inherit" onClick={() => setShareOpen(true)} >
            <ShareIcon />
          </IconButton>
          <div className={classes.grow} />
          {/* <Typography variant="h6" color="inherit" className={classes.title}>
            {game}
          </Typography> */}
          <div className={classes.grow} />
          <Button aria-controls="simple-menu" aria-haspopup="true" color="inherit" onClick={handeNewGame}>
            New Game
         </Button>
        </Toolbar>
      </AppBar>
      <div className={classes.main}>
        {games.map(g => game === g.id && <g.app game={g.id} id={id!} newGame={newGame} state={gameState as any} setState={setGameState}/>)}
        {/* {game === 'catan' && <Catan game={'catan'} id={id!} newGame={newGame}  />}
        {game === 'codenames' && <Codenames game={'codenames'} id={id!} newGame={newGame} state={gameState as any} setState={setGameState} />}
        {game === 'scattergories' && <Scattergories game={'scattergories'} id={id!} newGame={newGame} state={gameState as any} setState={setGameState} />} */}
      </div>
      <Dialog fullScreen open={chooseGame} onClose={handleClose}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" className={classes.menuButton} onClick={handleClose} aria-label="close">
              <BackIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.title}>
              Choose Game
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          <Games games={games} setGame={setGame} />
        </div>
      </Dialog>
      <Dialog open={shareOpen} onClose={() => setShareOpen(false)}>
        <DialogTitle id="alert-dialog-title">{"Share"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Share this link with your friends.
            <TextField
              autoFocus
              onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                const target = e.target;
                target.setSelectionRange(0, target.value.length);
              }}
              margin="dense"
              value={window.location.href}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => setShareOpen(false)} color="primary">
              Done
          </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withFirebase(GameComponent);
