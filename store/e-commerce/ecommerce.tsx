import { create } from 'zustand';

type ShippingOption = {
  id: number;
  label: string;
  cost: number;
  discountCost?: number;
  eta: string;
  isVoucherApplied: boolean;
};

type PaymentMethod = {
  id: number;
  label: string;
  logo: any;
  description?: string;
};

type EcommerceStore = {
  // SHIPPING
  selectedShipping: ShippingOption | null;
  setSelectedShipping: (option: ShippingOption) => void;

  // PAYMENT
  selectedPayment: PaymentMethod;
  setPaymentOption: (payment: PaymentMethod) => void;
  resetPaymentOption: () => void;
};

export const useEcommerceStore = create<EcommerceStore>(set => ({
  // Default shipping (optional default null)
  selectedShipping: null,
  setSelectedShipping: option => set({ selectedShipping: option }),

  // Default payment (BCA VA)
  selectedPayment: {
    id: 10,
    label: 'BCA Virtual Account',
    logo: require('@/assets/images/payment/bank/bca.png'),
    description: 'Virtual Account BCA',
  },
  setPaymentOption: payment => set({ selectedPayment: payment }),
  resetPaymentOption: () =>
    set({
      selectedPayment: {
        id: 10,
        label: 'BCA Virtual Account',
        logo: require('@/assets/images/payment/bank/bca.png'),
        description: 'Virtual Account BCA',
      },
    }),
}));
