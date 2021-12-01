import React from 'react';

interface CustomPropertyProps {
  onEdit: (key: string, val: string | number) => void;
}

export default class CustomProperty extends React.PureComponent<CustomPropertyProps> {
}
