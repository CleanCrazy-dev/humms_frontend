export interface ModalTheme {
  background: string;
}

export type Handler = () => void;

export interface InjectedProps {
  isOpen?: boolean;
  onDismiss?: Handler;
}