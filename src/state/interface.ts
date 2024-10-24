//create a zustand store for a token of a user
import { create } from "zustand";
import { SignUpStep } from "@/types/signUpSteps";
import { mountStoreDevtool } from "simple-zustand-devtools";
import MemberType from "@/types/MemberType";

type InterfaceState = {
  currentForm: any;
  currentSignUpStep: number;
  signUpErrorDetected: boolean;
  isGoingToPreviousStep: boolean;
  visitors: MemberType[];

  setVisitors: (visitors: any[]) => void;
  setCurrentSignUpStep: (step: number) => void;
  advanceToNextSignUpStep: () => void;
  goBackToPreviousSignUpStep: () => void;
  setCurrentForm: (form: any) => void;
  setSignUpErrorDetected: (value: boolean) => void;
};

export const useInterfaceStore = create<InterfaceState>((set: any, get: any) => ({
  currentSignUpStep: 1,
  signUpErrorDetected: false,
  currentForm: undefined,
  isGoingToPreviousStep: false,
  visitors: [
    // {
    //   familyName: "Doe",
    //   firstName: "John",
    //   lastName: "Doe",
    //   profileImageUrl: "https://thumbs.dreamstime.com/b/handsome-man-smiling-29530620.jpg",
    //   tags: ["gamer", "developer", "musician"],
    //   sex: "male",
    //   maritalStatus: "married",
    //   location: {
    //     address: "1234 Main St",
    //     city: "Nashville",
    //     zipCode: "37211",
    //     country: "United States",
    //     state: "Tennessee",
    //   },
    //   role: "member",
    //   checkInLocation: "inPerson",
    // },
    // {
    //   familyName: "Doe",
    //   firstName: "Jane",
    //   lastName: "Doe",
    //   profileImageUrl:
    //     "https://c8.alamy.com/comp/2HDMFC1/woman-30-45-years-female-ladies-lady-women-40s-baby-boomers-middle-age-middle-aged-middle-age-middle-aged-2HDMFC1.jpg",
    //   tags: ["gamer", "developer", "musician"],
    //   sex: "male",
    //   maritalStatus: "married",
    //   location: {
    //     address: "1234 Main St",
    //     city: "Nashville",
    //     zipCode: "37211",
    //     country: "United States",
    //     state: "Tennessee",
    //   },
    //   role: "member",
    //   checkInLocation: "inPerson",
    // },
  ] as MemberType[],

  setVisitors: (visitors: MemberType[]) => {
    set({ visitors });
  },
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
