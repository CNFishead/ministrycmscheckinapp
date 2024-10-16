//create a zustand store for a token of a user
import { create } from "zustand";
import { SignUpStep } from "@/types/signUpSteps";
import { mountStoreDevtool } from "simple-zustand-devtools";

type InterfaceState = {
  currentForm: any;
  currentSignUpStep: number;
  signUpErrorDetected: boolean;
  isGoingToPreviousStep: boolean;

  setCurrentSignUpStep: (step: number) => void;
  advanceToNextSignUpStep: () => void;
  goBackToPreviousSignUpStep: () => void;
  setCurrentForm: (form: any) => void;
  setSignUpErrorDetected: (value: boolean) => void;
};

export const useInterfaceStore = create<InterfaceState>((set: any, get: any) => ({
  currentSignUpStep: 0,
  signUpErrorDetected: false,
  currentForm: undefined,
  isGoingToPreviousStep: false,
  setCurrentSignUpStep: (step: number) => {
    set({ currentSignUpStep: step });
  },

  advanceToNextSignUpStep: () => {
    set((state: any) => {
      return {
        signUpErrorDetected: true,
        currentSignUpStep: state.currentSignUpStep + 1,
        isGoingToPreviousStep: false,
      };
    });
  },
  goBackToPreviousSignUpStep: () => {
    set((state: any) => {
      return {
        signUpErrorDetected: false,

        currentSignUpStep: state.currentSignUpStep - 1,
        isGoingToPreviousStep: true,
      };
    });
  },

  setCurrentForm: (form: any) => {
    set({ currentForm: form });
  },
  setSignUpErrorDetected: (value: boolean) => {
    set({ signUpErrorDetected: value });
  },
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("Store", useInterfaceStore);
}
