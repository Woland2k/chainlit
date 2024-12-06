import StopCircle from '@mui/icons-material/StopCircle';
import Telegram from '@mui/icons-material/Telegram';
import { Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import {
  useChatData,
  useChatInteract,
  useChatMessages
} from '@chainlit/react-client';

import { Translator } from 'components/i18n';
import { orange, neutrals } from 'theme/palette';

interface SubmitButtonProps {
  disabled?: boolean;
  onSubmit: () => void;
}

const SubmitButton = ({ disabled, onSubmit }: SubmitButtonProps) => {
  const { loading } = useChatData();
  const { firstInteraction } = useChatMessages();
  const { stopTask } = useChatInteract();

  const handleClick = () => {
    stopTask();
  };

  return (
    <Box
      sx={{
        mr: 0,
        color: 'text.secondary'
      }}
    >
      {loading && firstInteraction ? (
        <Tooltip
          title={
            <Translator path="components.organisms.chat.inputBox.SubmitButton.stopTask" />
          }
        >
          <IconButton 
            id="stop-button" 
            onClick={handleClick}
            sx={{
              width: 32,
              height: 32,
              color: 'text.primary',
              '&:hover': {
                backgroundColor: orange.dark
              }
            }}
          >
            <StopCircle sx={{ color: orange.dark }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip
          title={
            <Translator path="components.organisms.chat.inputBox.SubmitButton.sendMessage" />
          }
        >
          <IconButton 
            disabled={disabled} 
            onClick={onSubmit}
            sx={{
              backgroundColor: disabled ? neutrals.grey100 : orange.main,
              color: disabled ? neutrals.grey200 : neutrals.white,
              '&:hover': {
                backgroundColor: disabled ? neutrals.grey100 : orange.dark
              },
              '&.Mui-disabled': {
                backgroundColor: neutrals.grey100,
                color: neutrals.white
              },
              transition: 'all 0.2s ease',
              width: 32,
              height: 32
            }}
          >
            <Telegram sx={{ fontSize: 20 }} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export { SubmitButton };
