import { deferred, noop, randomStr } from "@/utils/helper";
import { last } from "es-toolkit";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { View } from "react-native";
import Overlay from "./Overlay";

type Portal<T = void> = {
  name: string;
  index: number;
  close: (result: T | Error) => void;
};

type PortalComponent<T = void> = React.FC<Portal<T>>;

type PortalState = Portal<any> & {
  component: PortalComponent<unknown>;
};

type PromiseWithPortal<T> = Promise<T> & Portal<T>;

type ShowPortalMethodParams<T = unknown> = {
  name?: string;
  index?: number;
  component: PortalComponent<T>;
};

type ShowPortalWithOverlayParams<T = unknown> = ShowPortalMethodParams<T> & {
  overlay?: Omit<
    React.ComponentProps<typeof Overlay>,
    "name" | "onClose" | "handleBack" | "children"
  >;
};

interface PortalContextProps {
  show: <T = void>(props: ShowPortalMethodParams<T>) => PromiseWithPortal<T>;
  showWithOverlay: <T = void>(
    props: ShowPortalWithOverlayParams<T>
  ) => PromiseWithPortal<T>;
  remove: (name: string) => void;
  removeAll: () => void;
}

const isShowPortalWithOverlayParams = <T,>(
  params: ShowPortalMethodParams<T> | ShowPortalWithOverlayParams<T>
): params is ShowPortalWithOverlayParams<T> => {
  return !!(params as ShowPortalWithOverlayParams).overlay;
};

const PortalContext = createContext<PortalContextProps>({
  show: noop,
  showWithOverlay: noop,
  remove: noop,
  removeAll: noop,
});

const getTopPortalName = (portals: Map<string, PortalState>) => {
  return last([...portals.values()].sort((a, b) => a.index - b.index))?.name;
};

export const PortalProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [portals, _setPortals] = useState<Map<string, PortalState>>(new Map());
  const topPortalRef = useRef<string>(undefined);
  const setPortals = useCallback<
    React.Dispatch<React.SetStateAction<Map<string, PortalState>>>
  >((action) => {
    if (typeof action === "function") {
      _setPortals((prev) => {
        const res = action(prev);
        topPortalRef.current = getTopPortalName(res);
        return res;
      });
    } else {
      _setPortals(action);
      topPortalRef.current = getTopPortalName(action);
    }
  }, []);
  const remove = useCallback(
    (name: string) => {
      setPortals((prev) => {
        prev.delete(name);
        return new Map(prev);
      });
    },
    [setPortals]
  );
  const show = useCallback(
    function <T = void>(
      props: ShowPortalMethodParams<T> | ShowPortalWithOverlayParams<T>
    ) {
      let { name = `Portal_${randomStr()}`, index, component } = props;

      const { promise, resolve, reject } = deferred<T>();
      promise.finally(remove.bind(null, name));
      const close = (result: T | Error) => {
        if (result instanceof Error) {
          reject(result);
        } else {
          resolve(result);
        }
      };

      setPortals((prev) => {
        if (prev.has(name)) return prev;
        index ??= prev.size;
        prev.set(name, {
          name,
          index,
          component: isShowPortalWithOverlayParams(props)
            ? () => (
                <Overlay
                  {...props.overlay}
                  name={name}
                  onClose={close}
                  handleBack={() => name === topPortalRef.current}
                >
                  {React.createElement(props.component, {
                    name,
                    index: index!,
                    close,
                  })}
                </Overlay>
              )
            : component,
          close,
        });
        return new Map(prev);
      });

      const promiseWithClose = promise as PromiseWithPortal<T>;
      promiseWithClose.name = name;
      promiseWithClose.index = index!;
      promiseWithClose.close = close;
      return promiseWithClose;
    },
    [remove, setPortals]
  );
  const showWithOverlay = useCallback(
    function <T = void>(props: ShowPortalWithOverlayParams<T>) {
      return show({
        ...props,
        overlay: {
          ...props.overlay,
        },
      });
    },
    [show]
  );
  const removeAll = useCallback(() => {
    setPortals(new Map());
  }, [setPortals]);
  const renderPortals = useMemo(() => {
    return [...portals.values()].sort((a, b) => a.index - b.index);
  }, [portals]);
  const value = useMemo(
    () => ({
      show,
      showWithOverlay,
      remove,
      removeAll,
    }),
    [show, showWithOverlay, remove, removeAll]
  );
  return (
    <PortalContext.Provider value={value}>
      {children}
      {renderPortals.length > 0 && (
        <View className="absolute inset-0">
          {renderPortals.map((portal) =>
            React.createElement(portal.component, {
              ...portal,
              key: `${portal.name}_${portal.index}`,
            })
          )}
        </View>
      )}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context)
    throw new Error('You should use "PortalProvider" wrapper this component');
  return context;
};
