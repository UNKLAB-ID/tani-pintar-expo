// store/vendorStore.ts
import { create } from "zustand";

interface VendorFormState {
    vendor_type: string;
    phone_number: string;
    address: string;
    logo: any;
    full_name: string;
    id_card_photo: any;
    business_name: string;
    business_number: string;
    business_nib: any;
    npwp: string;
    province: number;
    city: number;
    district: number;
    latitude: string;
    longitude: string;
    address_detail: string;
    postal_code: string;
    name: string;

    province_name: string;
    city_name: string;
    district_name: string;

    setField: (key: keyof VendorFormState, value: any) => void;
    resetForm: () => void;
}

const initialState = {
    vendor_type: "individual",
    phone_number: "",
    address: "",
    logo: null,
    full_name: "",
    id_card_photo: null,
    business_name: "",
    business_number: "",
    business_nib: null,
    npwp: "",
    province: 0,
    city: 0,
    district: 1,
    latitude: "",
    longitude: "",
    address_detail: "",
    postal_code: "",
    name: "",

    // for display purpose
    province_name: "",
    city_name: "",
    district_name: "",
};

export const useRegisterRoleStore = create<VendorFormState>((set) => ({
    ...initialState,
    setField: (key, value) => set({ [key]: value }),
    resetForm: () => set(initialState),
}));
