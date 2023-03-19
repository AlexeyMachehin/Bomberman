import React, { useState } from 'react';
import { IconButton, Popover } from '@mui/material';
import { IMessage } from '../../../../../../service/types/forumPage/IMessage';
import classes from './messageReaction.module.css';
import EmojiPicker, { Categories, EmojiClickData } from 'emoji-picker-react';
import { AddReactionOutlined } from '@mui/icons-material';
import { useAppDispatch } from '@/utils/hooks';
import { addMessageReaction, loadSection } from '@/store/forum/thunk';
import { useParams } from 'react-router-dom';

interface IMessageReactionProps {
  message: IMessage;
}

export default function MessageDashboard({ message }: IMessageReactionProps) {
  const { mainTopic } = useParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useAppDispatch();

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setAnchorEl(null);
    dispatch(
      addMessageReaction({ reaction: emojiData.unified, messageId: message.id })
    ).then(() => {
      if (mainTopic) dispatch(loadSection(mainTopic));
    });
  };

  return (
    <div>
      <IconButton className={classes.button} onClick={handleClick}>
        <AddReactionOutlined className={classes.buttonIcon} />
      </IconButton>

      <Popover
        anchorEl={anchorEl}
        open={isOpen}
        onClose={() => {
          setAnchorEl(null);
        }}>
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          autoFocusSearch={false}
          categories={[
            {
              name: 'Smiles & Emotions',
              category: Categories.SMILEYS_PEOPLE,
            },
          ]}
        />
      </Popover>
    </div>
  );
}
