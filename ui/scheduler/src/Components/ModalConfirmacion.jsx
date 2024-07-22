import React, { useState } from "react";

export default function ModalConfirmacion({ isOpen, onClose, onConfirm, identifier, entityName }) {
  const [input, setInput] = useState("");

  const handleConfirm = () => {
    if (input === identifier) {
      onConfirm();
      onClose();
    } else {
      alert(`${entityName} incorrecto.`);
    }
  };
  const handleCancel = () => {
    setInput("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-gray-700 p-4 rounded">
        <h2 className="text-xl font-bold mb-4">Confirmar Eliminación</h2>
        <p className="mb-4">Escribe el ID para confirmar:<p className="text-red-500">{identifier}</p> </p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <div className="flex justify-end">
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}