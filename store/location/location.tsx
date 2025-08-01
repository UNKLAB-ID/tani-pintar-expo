import { create } from 'zustand';

type Location = {
  id: number;
  name: string;
  createdAt: string;
};

type LocationStore = {
  selectedCountry: Location | null;
  selectedCity: Location | null;
  setSelectedCountry: (country: Location) => void;
  setSelectedCity: (city: Location) => void;
};

export const useUserLocation = create<LocationStore>()(set => ({
  selectedCountry: null,
  selectedCity: null,
  setSelectedCountry: country => set({ selectedCountry: country }),
  setSelectedCity: city => set({ selectedCity: city }),
}));
