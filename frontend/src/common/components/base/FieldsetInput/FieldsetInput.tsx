import React from 'react';

interface FieldsetInputProps {
  title: string;
  value: string | undefined;
  readOnly?: boolean;
}

const FieldsetInput: React.FC<FieldsetInputProps> = ({ title, value, readOnly = true }) => {
  return (
    <fieldset className="fieldset w-xs p-4">
      <legend className="fieldset-legend text-lg font-semibold">{title}</legend>
      <input
        type="text"
        className="input border border-primary rounded-md w-full focus:outline-none"
        value={value ?? "---"}
        readOnly={readOnly}
      />
    </fieldset>
  );
};

export default FieldsetInput;
