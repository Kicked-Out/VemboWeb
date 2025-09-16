import * as React from "react";

import type {
    ToastActionElement,
    ToastProps,
} from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 5000;

const actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST",
} as const;

type ActionType = typeof actionTypes;

export type ToasterToast = ToastProps & {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: ToastActionElement;
};

type Action =
    | { type: ActionType["ADD_TOAST"]; toast: ToasterToast }
    | {
          type: ActionType["UPDATE_TOAST"];
          toast: Partial<ToasterToast> & Pick<ToasterToast, "id">;
      }
    | { type: ActionType["DISMISS_TOAST"]; toastId?: ToasterToast["id"] }
    | { type: ActionType["REMOVE_TOAST"]; toastId?: ToasterToast["id"] };

interface State {
    toasts: ToasterToast[];
}

let memoryState: State = { toasts: [] };
let count = 0;

const listeners = new Set<(state: State) => void>();
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER;
    return count.toString();
}

function dispatch(action: Action) {
    memoryState = reducer(memoryState, action);
    listeners.forEach((listener) => {
        listener(memoryState);
    });
}

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case actionTypes.ADD_TOAST:
            return {
                ...state,
                toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
            };
        case actionTypes.UPDATE_TOAST:
            return {
                ...state,
                toasts: state.toasts.map((toast) =>
                    toast.id === action.toast.id ? { ...toast, ...action.toast } : toast
                ),
            };
        case actionTypes.DISMISS_TOAST: {
            const { toastId } = action;

            if (toastId) {
                addToRemoveQueue(toastId);
            } else {
                state.toasts.forEach((toast) => {
                    addToRemoveQueue(toast.id);
                });
            }

            return {
                ...state,
                toasts: state.toasts.map((toast) =>
                    toast.id === toastId || toastId === undefined
                        ? { ...toast, open: false }
                        : toast
                ),
            };
        }
        case actionTypes.REMOVE_TOAST:
            if (action.toastId === undefined) {
                return {
                    ...state,
                    toasts: [],
                };
            }

            return {
                ...state,
                toasts: state.toasts.filter((toast) => toast.id !== action.toastId),
            };
        default:
            return state;
    }
}

function addToRemoveQueue(toastId: string) {
    if (toastTimeouts.has(toastId)) {
        return;
    }

    const timeout = setTimeout(() => {
        toastTimeouts.delete(toastId);
        dispatch({ type: actionTypes.REMOVE_TOAST, toastId });
    }, TOAST_REMOVE_DELAY);

    toastTimeouts.set(toastId, timeout);
}

export function toast({ id, ...props }: Omit<ToasterToast, "id"> & { id?: string }) {
    const toastId = id ?? genId();

    dispatch({
        type: actionTypes.ADD_TOAST,
        toast: {
            ...props,
            id: toastId,
            open: true,
            onOpenChange: (open: boolean) => {
                if (!open) {
                    dismiss(toastId);
                }
            },
        },
    });

    return {
        id: toastId,
        dismiss: () => dismiss(toastId),
        update: (updates: Partial<Omit<ToasterToast, "id">>) =>
            dispatch({
                type: actionTypes.UPDATE_TOAST,
                toast: { ...updates, id: toastId },
            }),
    };
}

export function dismiss(toastId?: string) {
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId });
}

export function useToast() {
    const [state, setState] = React.useState<State>(memoryState);

    React.useEffect(() => {
        const listener = (nextState: State) => {
            setState(nextState);
        };

        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    }, []);

    return {
        ...state,
        toast,
        dismiss,
    };
}
