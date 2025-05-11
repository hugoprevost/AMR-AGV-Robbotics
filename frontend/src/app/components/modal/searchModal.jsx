import React, { useEffect } from 'react';
import './searchModal.scss';

const SearchModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-search">
      <div className="modal-search-content">
        <div className="modal-search-content-close" onClick={onClose}>&times;</div>
        {children}
      </div>
    </div>
  );
};

export default SearchModal;