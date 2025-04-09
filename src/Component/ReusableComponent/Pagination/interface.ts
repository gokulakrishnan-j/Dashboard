export interface PaginationProps {
  onPrevues: () => void;
  onNext: () => void;
  text: string | number;
  disabledNext?: boolean;
  disabledPrevious?: boolean;
}
