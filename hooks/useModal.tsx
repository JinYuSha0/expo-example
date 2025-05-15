import { ConfirmModal } from "@/components/Modal";
import { usePortal } from "@/components/Portal";
import { compose } from "@/utils/helper";
import { noop } from "es-toolkit";
import React, { useCallback } from "react";

export const useConfirm = () => {
  const { showWithOverlay } = usePortal();
  const show = useCallback(
    (props: React.ComponentProps<typeof ConfirmModal>) => {
      return showWithOverlay<boolean>({
        component: ({ close }) => (
          <ConfirmModal
            {...props}
            onOk={compose(props.onOk ?? noop, close.bind(null, true))}
            onCancel={compose(props.onCancel ?? noop, close.bind(null, false))}
          />
        ),
      });
    },
    [showWithOverlay]
  );
  return show;
};
