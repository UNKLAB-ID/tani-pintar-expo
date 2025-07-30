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

type VoucherItem = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  value: number;
  type: 'shipping' | 'discount';
};

type EcommerceStore = {
  // SHIPPING
  selectedShipping: ShippingOption | null;
  setSelectedShipping: (option: ShippingOption) => void;

  // VOUCHERS
  shippingVoucher: VoucherItem | null;
  discountVoucher: VoucherItem | null;
  applyVoucher: (voucher: VoucherItem) => void;
  cancelVoucher: (voucher: VoucherItem) => void;

  // PAYMENT
  selectedPayment: PaymentMethod;
  setPaymentOption: (payment: PaymentMethod) => void;
  resetPaymentOption: () => void;
};

export const useEcommerceStore = create<EcommerceStore>(set => ({
  // Default shipping
  selectedShipping: null,
  setSelectedShipping: option => set({ selectedShipping: option }),

  // Vouchers
  shippingVoucher: null,
  discountVoucher: null,
  applyVoucher: voucher => {
    if (voucher.type === 'shipping') {
      set(state => ({
        shippingVoucher: voucher,
        // Jika sudah ada selectedShipping, update harganya
        selectedShipping: state.selectedShipping
          ? {
              ...state.selectedShipping,
              discountCost: state.selectedShipping.cost,
              cost: Math.max(state.selectedShipping.cost - voucher.value, 0),
              isVoucherApplied: true,
            }
          : null,
      }));
    } else {
      set({ discountVoucher: voucher });
    }
  },
  cancelVoucher: voucher => {
    if (voucher.type === 'shipping') {
      set(state => ({
        shippingVoucher: null,
        selectedShipping: state.selectedShipping
          ? {
              ...state.selectedShipping,
              cost:
                state.selectedShipping.discountCost ??
                state.selectedShipping.cost,
              discountCost: undefined,
              isVoucherApplied: false,
            }
          : null,
      }));
    } else {
      set({ discountVoucher: null });
    }
  },

  // Payment
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
