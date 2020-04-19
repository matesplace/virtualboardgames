import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import { colorMap, players } from '../state';
import { Board } from '../board/Board';

import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';

import Person from '@material-ui/icons/Person';
import PersonOutline from '@material-ui/icons/PersonOutline';

// import CityIcon from './resources/CityIcon';
import RobberIcon from './resources/RobberIcon';
import SvgIcon from '@material-ui/core/SvgIcon';

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    padding: theme.spacing(0, 1),
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);


interface UserChooserProps {
  board: Board;
  current: number;
  setCurrent: (index: number) => void;
  robberOn: boolean;
  setRobber: (robberOn: boolean) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
    alignItems: 'center',
    paddingBottom: 0
  },
  icons: {
    flexShrink: 0,
    display: 'flex',
    border: `1px solid ${theme.palette.divider}`,
    borderBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    flexWrap: 'nowrap',
  },
}));

export default function UserChooser(props: UserChooserProps) {
  const classes = useStyles();
  const { board, current, setCurrent, robberOn, setRobber } = props;

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.icons}>

        <StyledToggleButtonGroup exclusive value={current} aria-label="button group"
          onChange={(e: React.MouseEvent<HTMLElement>, value: any) => setCurrent(value)}>
          {colorMap.map((color, index) => (
            <ToggleButton value={index} key={`color_chooser_${index}`}>
              <Badge badgeContent={board.longestPlayer == index ? 'L' : 0} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} variant="dot" color="secondary">
                <Badge badgeContent={board.getTotals(index)} color="secondary">
                  {index == current && <Person style={{ color: color }} />}
                  {index != current && <PersonOutline style={{ color: color }} />}
                </Badge>
              </Badge>
            </ToggleButton>
          ))}
        </StyledToggleButtonGroup>
        <IconButton onClick={() => setRobber(!robberOn)}>
          {!robberOn && <SvgIcon><RobberIcon fill={'#A2A8A4'} transform={`translate(12,5) scale(5)`} /></SvgIcon>}
          {robberOn && <SvgIcon><RobberIcon fill={'#4A5358'} transform={`translate(12,5) scale(5)`} /></SvgIcon>}
        </IconButton>
      </Paper>
    </div>
  );
}
