export type SignUpStep = {
  id: number;
  title?: string;
  // JSX element or HTML element
  component: JSX.Element;
  nextButtonText?: string;
  isHiddenOnSteps?: boolean;
  headerText: string;
  icon?: JSX.Element;
  subHeaderText: string;
  nextButtonDisabled?: boolean;
  hideBackButton?: boolean;
  hideNextButton?: boolean;
  nextButtonAction?: () => void;
  previousButtonAction?: () => void;
};
