export type ConfirmDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  description: string;
  onConfirm: () => void;
};