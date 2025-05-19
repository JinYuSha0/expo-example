import { ConfirmModal } from "@/components/Modal";
import { OverlayProps } from "@/components/Overlay";
import { ShowPortalMethodParams, usePortal } from "@/components/Portal";
import { compose } from "@/utils/helper";
import { noop } from "es-toolkit";
import React, { useCallback } from "react";

type ShowPortalProps = Pick<ShowPortalMethodParams, "index" | "name"> & {
  overlay?: Pick<
    OverlayProps,
    "closeable" | "overlayPressCloaseable" | "bgColor" | "orientation"
  >;
};

export const useConfirm = () => {
  const { showWithOverlay } = usePortal();
  const show = useCallback(
    (props: React.ComponentProps<typeof ConfirmModal> & ShowPortalProps) => {
      const { name, index, overlay, ...rest } = props;
      return showWithOverlay<boolean>({
        name,
        index,
        overlay,
        component: ({ close }) => (
          <ConfirmModal
            {...rest}
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
