import React from 'react';

interface ToggleSwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, handleToggle }) => {
  return (
    <div
      className={`relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in ${
        isOn ? 'bg-blue-600' : 'bg-gray-300'
      } rounded-full`}
      onClick={handleToggle}
    >
      <span
        className={`absolute inline-block w-6 h-6 transform bg-white rounded-full shadow inset-y-0 transition-transform duration-200 ease-in ${
          isOn ? 'translate-x-full' : ''
        }`}
      />
    </div>
  );
};

export default ToggleSwitch;