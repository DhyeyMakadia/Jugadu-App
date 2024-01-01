import React, { FC, useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  useTheme,
  useMediaQuery,
  Slide,
  IconButton,
  Button,
  Box
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { QRCode } from 'react-qrcode-logo';
import WalletService from 'src/services/wallet/index';
import { GetUpiObject } from 'src/services/types/wallet';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

type Props = {
  isOpen: boolean;
  handleClose: (x?: boolean) => void;
};

const AddMoneyDialog: FC<Props> = ({ handleClose, isOpen }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [upiData, setUpiData] = useState<GetUpiObject>({
    upi_id: '',
    merchant_name: ''
  });

  const handlePayment = (mode: string) => {
    const transactionNote = 'AddMoney';
    let url = `pay?pa=${upiData.upi_id}&pn=${upiData.merchant_name}&tn=${transactionNote}`;
    switch (mode) {
      case 'PayTM':
        url = 'paytmmp://' + url;
        break;
      case 'PhonePe':
        url = 'phonepe://' + url;
        break;
      case 'GooglePay':
        url = 'tez://upi/' + url;
        break;
      default:
        url = 'upi://' + url;
        break;
    }
    const newWindow = window.open(url, '', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
    handleClose();
  };

  useEffect(() => {
    if (isOpen) {
      WalletService.GetUpiDetails().then((res) => {
        if (res.data.success) {
          setUpiData(res.data.data);
        }
      });
    }
  }, [isOpen]);

  return (
    <Dialog
      fullScreen={fullScreen}
      onClose={() => handleClose()}
      open={isOpen}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Money</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={() => handleClose()}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500]
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <Box>
              <div>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                  <p className="text-white" style={{ marginBottom: '10px' }}>
                    Scan the QR code or click the button to make the payment
                  </p>
                  <QRCode
                    value={`upi://pay?pa=${upiData.upi_id}&pn=${upiData.merchant_name}&tn=AddMoney`}
                    size={260}
                    // logoImage="https://i.postimg.cc/5tdHfkxF/118852864-1241633666213183-4722008391193475906-n.png"
                    // logoWidth={80}
                    // logoHeight={100}
                    // logoOpacity={0.6}
                  />
                </div>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  className="custom-bg-green"
                  style={{ marginBottom: '10px' }}
                  onClick={() => handlePayment('GooglePay')}
                >
                  Google Pay
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  className="custom-bg-green"
                  style={{ marginBottom: '10px' }}
                  onClick={() => handlePayment('PhonePe')}
                >
                  Phone Pe
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  className="custom-bg-green"
                  style={{ marginBottom: '10px' }}
                  onClick={() => handlePayment('PayTM')}
                >
                  PayTM
                </Button>
              </div>
            </Box>
            {/* <img
              src="/Payment-QRCode.jpg"
              alt=""
              style={{ objectFit: 'contain', width: '100%' }}
            /> */}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AddMoneyDialog;
