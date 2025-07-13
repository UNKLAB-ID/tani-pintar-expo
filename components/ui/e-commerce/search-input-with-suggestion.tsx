import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

interface SearchInputWithSuggestionProps {
  placeholder?: string;
  data?: string[];
  onSelectItem?: (item: string) => void;
}

const SearchInputWithSuggestion: React.FC<SearchInputWithSuggestionProps> = ({
  placeholder = 'Find what you’re looking for...',
  data = [],
  onSelectItem = () => {},
}) => {
  return <View className="relative"></View>;
};

export default SearchInputWithSuggestion;
