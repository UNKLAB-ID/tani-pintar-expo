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
  latAddress: Number | null;
  longAddress: Number | null;
  setLatAddress: (lat: Number) => void;
  setLongAddress: (long: Number) => void;
};

export const useUserLocation = create<LocationStore>()(set => ({
  selectedCountry: null,
  selectedCity: null,
  setSelectedCountry: country => set({ selectedCountry: country }),
  setSelectedCity: city => set({ selectedCity: city }),
  latAddress: null,
  longAddress: null,
  setLatAddress: lat => set({ latAddress: lat }),
  setLongAddress: long => set({ longAddress: long }),
}));
