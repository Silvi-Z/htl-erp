import { Button } from "../Button";
import { Modal } from "../Modal";
export function ConfirmDialog({
  open,
  title = "Confirm action",
  message,
  onCancel,
  onConfirm,
  confirmLabel = "Confirm",
  danger = false,
  loading = false,
}: {
  open: boolean;
  title?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  danger?: boolean;
  loading?: boolean;
}) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      footer={
        <>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm} loading={loading}>
            {danger ? "Delete" : confirmLabel}
          </Button>
        </>
      }
    >
      <p style={{ margin: 0, color: "#3d3a34" }}>{message}</p>
    </Modal>
  );
}
