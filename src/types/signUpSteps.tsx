export type SignUpStep = {
  id: number;
  title?: string;
  // JSX element or HTML element
  component: JSX.Element;
  nextButtonText?: string;
  backButtonText?: string;
  isHiddenOnSteps?: boolean;
  headerText?: string;
  icon?: JSX.Element;
  subHeaderText?: string;
  nextButtonDisabled?: boolean;
  backButtonDisabled?: boolean;
  hideBackButton?: boolean;
  hideNextButton?: boolean;
  buttonStyling?: string;
  nextButtonStyling?: string;
  backButtonStyling?: string;
  nextButtonAction?: () => void;
  previousButtonAction?: () => void;
};
