import React from 'react';
import CustomModal from './CustomModal';

const ConfirmDeleteModal = ({ isVisible, onClose, onConfirm }) => {
  return (
    <CustomModal
      isVisible={isVisible}
      title="Confirm Delete"
      content={<p>Are you sure you want to delete this task?</p>}
      onClose={onClose}
      onConfirm={onConfirm}
    />
  );
};

export default ConfirmDeleteModal;
