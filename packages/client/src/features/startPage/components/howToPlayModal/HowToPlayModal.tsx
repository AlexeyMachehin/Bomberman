import { useState, forwardRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import classes from './howToPlayModal.module.css';
import arrowsImg from '../../../../../static/img/arrows.jpg';
import spaceImg from '../../../../../static/img/space.png';

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => void;
  onExited?: () => void;
}

const Fade = forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

export default function HowToPlayModal() {
  const [isModalOpen, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="Open guide">
        <Button onClick={() => setOpen(true)}>How to play</Button>
      </Tooltip>
      <Modal
        className={classes.modalWrapper}
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={isModalOpen}
        onClose={() => setOpen(false)}
        closeAfterTransition>
        <Fade in={isModalOpen}>
          <Box className={classes.textModal}>
            <div className={classes.iconsContainer}>
              <img className={classes.icon} src={arrowsImg} alt="arrows" />
              <Typography id="spring-modal-title">arrows - move</Typography>
            </div>
            <div className={classes.iconsContainer}>
              <img className={classes.icon} src={spaceImg} alt="space" />
              <Typography id="spring-modal-title">
                space - plant a bomb
              </Typography>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
