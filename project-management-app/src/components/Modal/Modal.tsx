import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

export class Modal extends React.Component<Record<string, React.ReactNode>, { showModal: boolean | null }> {
  el: HTMLDivElement;
  showModal: (() => boolean) | undefined;
  
  constructor(props: Record<string, React.ReactNode>) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.getElementById('modal-root')?.appendChild(this.el);
  }

  componentWillUnmount() {
    document.getElementById('modal-root')?.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
