// import React from "react";
// import { Button } from "./Button";
// import { AlertTriangle } from "lucide-react";
// import { Modal } from "./Modal";

// interface ConfirmDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   onCancel: () => void;
//   title: string;
//   message: string;
//   confirmText?: string;
//   cancelText?: string;
//   isLoading?: boolean;
// }

// export function ConfirmDialog({
//   isOpen,
//   onClose,
//   onConfirm,
//   onCancel,
//   title,
//   message,
//   confirmText = "Confirm",
//   cancelText = "Cancel",
//   isLoading = false,
// }: ConfirmDialogProps) {
//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="sm">
//       <div data-testid="confirm-dialog" className="text-center">
//         <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
//           <AlertTriangle className="h-6 w-6 text-red-600" />
//         </div>

//         <p className="text-sm text-gray-500 mb-6">{message}</p>

//         <div className="flex justify-end gap-3">
//           <Button
//             variant="outline"
//             onClick={onCancel}
//             disabled={isLoading}
//             data-testid="cancel-delete"
//           >
//             {cancelText}
//           </Button>

//           <Button
//             variant="danger"
//             onClick={onConfirm}
//             isLoading={isLoading}
//             data-testid="confirm-delete"
//           >
//             {confirmText}
//           </Button>
//         </div>
//       </div>
//     </Modal>
//   );
// }

import React from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  onClose,
}: ConfirmDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      data-testid="confirm-dialog"
    >
      <div className="space-y-4">
        <p>{message}</p>
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            data-testid="cancel-delete"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            data-testid="confirm-delete"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
