import React, { FC } from 'react';
import {
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Typography
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import Text from '../Text';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type ProfileDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const HowToPlayDialog: FC<ProfileDialogProps> = ({ isOpen, handleClose }) => {
  return (
    <Dialog
      onClose={handleClose}
      open={isOpen}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>How to Play</DialogTitle>
      <DialogContent>
        <CardContent sx={{ py: 2, px: 4 }}>
          <Typography variant="body1" paddingBottom={1}>
            Learn how to play JUGADU Game right here, and take part in the first
            online Betting for the whole of India. Whether you’re located in
            India or elsewhere, playing couldn’t be simpler and takes seconds.
            Read on to find out how the Game works, how to enter and what to
            expect from the JUGADU.
          </Typography>
          <Typography variant="body1" paddingBottom={1}>
            Entering a JUGADU will only take you a maximum of minutes. Minimum
            Betting point 10 and you will only need a computer, tablet or
            smartphone that can access the internet to play online. Once you are
            ready to play JUGADU Game, follow the steps below:
          </Typography>
          <Typography variant="subtitle2">
            <ol>
              <li>First of all, Signup and Login to your JUGADU Account.</li>
              <li>Deposit Balance and Start Play.</li>
              <li>Minimum amount to bet is Point 10.</li>
              <li>
                The Game you played and got lucky enough to win it then
                accordingly your points will be increased.
              </li>
              <li>
                If you wish to Ancash the points of your ID then kindly WhatsApp
                Massage us and your money will be transfer to your account as
                soon as.
              </li>
            </ol>
          </Typography>
          <Typography variant="body1" paddingBottom={1}>
            **in case of any inconvenience regarding the transaction of money OR
            further query the you can contact us on the following numbers.
          </Typography>
          <Typography variant="subtitle1" paddingBottom={1}>
            <ul>
              <li>
                JUGADU allows you to earn money by Predict correct Yantra. The
                amount earned can be withdrawn through UPI or Bank.
              </li>
              <li>
                It’s also important to mention the top-notch refer-and-earn
                scheme offered by the JUGADU. You can refer your friends, and if
                any of them opt to top off their wallets, you will receive 10%
                points as a commission.
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" paddingBottom={1}>
            WhatsApp - 9558958458.
          </Typography>
          <Typography variant="body1" paddingBottom={1}>
            Thanks
          </Typography>
          <Typography variant="body1" paddingBottom={1}>
            Regards
          </Typography>
          <Typography variant="body1" paddingBottom={1}>
            JUGADU GAME.
          </Typography>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default HowToPlayDialog;
