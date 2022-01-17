import React, { ChangeEvent } from 'react';
import './button.css';


interface FileButtonProps {
  onValueUpdate: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  containerClassname?: string;
  svg?: string;
  value?: string;
}

export default function FileButton(props: FileButtonProps) {
  const {
    onValueUpdate,
    label,
    containerClassname,
    value,
    svg,
  } = props;

  const buttonComponent = (
    <input
      className="file-button-container"
      type="file"
      name={label}
      onChange={onValueUpdate}
      value={value}
    />
  );




  return containerClassname ? (
    <div className={containerClassname}>
      {buttonComponent}
    </div>
  ) : buttonComponent;
}
