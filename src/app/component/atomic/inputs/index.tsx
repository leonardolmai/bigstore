import React from 'react';

interface InputFieldProps {
  label: string;
  className: string;
  name: string;
  id: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, className, name, id }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input className={className} type="text" name={name} id={id} />
    </div>
  );
};

export default InputField;