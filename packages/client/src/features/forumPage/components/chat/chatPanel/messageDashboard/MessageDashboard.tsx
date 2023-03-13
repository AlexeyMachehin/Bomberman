import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { IMessage } from '../../../../../../service/types/forumPage/IMessage';
import classes from './messageDashboard.module.css';

interface IMessageDashboardProps {
  message: IMessage;
  createAnswer: (message: IMessage) => void;
}

export default function MessageDashboard({
  message,
  createAnswer,
}: IMessageDashboardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <IconButton
        className={classes.button}
        aria-controls={isOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleClick}>
        <MenuIcon className={classes.buttonIcon} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={() => {
          setAnchorEl(null);
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            createAnswer(message);
          }}>
          To answer
        </MenuItem>
      </Menu>
    </div>
  );
}
