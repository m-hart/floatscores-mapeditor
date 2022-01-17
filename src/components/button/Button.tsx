import React from 'react';
import './button.css';

interface ButtonProps {
  onClick: (e: React.MouseEvent) => void;
  label: string;
  containerClassname?: string;
  svg?: string;
}

export default function Button(props: ButtonProps) {
  const {
    onClick,
    label,
    containerClassname,
    svg,
  } = props;

  const buttonComponent = (
    <button
      onClick={onClick}
      className="button-container"
    >
      {label}
    </button>
  );




  return containerClassname ? (
    <div className={containerClassname}>
      {buttonComponent}
    </div>
  ) : buttonComponent;
}
