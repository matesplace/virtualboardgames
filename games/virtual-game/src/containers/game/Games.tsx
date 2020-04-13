import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  grid: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing(2)
  },
  root: {
  },
  media: {
    height: 180,
  },
}));

export interface GameEntry {
  id: string;
  name: string;
}

interface GamesProps {
  games: GameEntry[];
  setGame: (game: string) => void;
}

export default function Games(props: GamesProps) {
  const classes = useStyles();

  const games = props.games;

  return (
    <Grid container className={classes.grid} spacing={2}>
      {games.map(game => (
        <Grid key={`game_${game.name}`} item xs={12} sm={6} md={3}>
          <Card className={classes.root} onClick={() => props.setGame(game.id)}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={`/games/${game.id}.png`}
                title="Contemplative Reptile"
              />
              {/* <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {game.name}
                </Typography>
              </CardContent> */}
            </CardActionArea>
          </Card>
        </Grid>
      ))}

    </Grid>
  );
}
