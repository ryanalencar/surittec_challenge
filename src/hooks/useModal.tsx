import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

import { ClientType } from './useClient';

interface IModalProviderProps {
  children: ReactNode;
}

interface ModalData {
  editing: boolean;
  deleting: boolean;
  data?: ClientType;
}

export interface IModalContextData {
  isModalOpen: boolean;
  modalData: ModalData;
  toggleModal: () => void;
  toggleEditModal: (data: any) => void;
  toggleRemoveModal: (clientId: number) => void;
}

const ModalContext = createContext<IModalContextData>({} as IModalContextData);

export function ModalProvider({ children }: IModalProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({
    editing: false,
    deleting: false,
    data: {} as ClientType,
  });

  const toggleModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      setModalData({
        editing: false,
        deleting: false,
        data: {} as ClientType,
      });
    } else setIsModalOpen(true);
  };

  const toggleEditModal = (data: ClientType) => {
    toggleModal();
    setModalData({
      deleting: false,
      editing: true,
      data,
    });
  };

  const toggleRemoveModal = (clientId: number) => {
    toggleModal();
    setModalData({
      deleting: true,
      editing: false,
      data: { id: clientId } as ClientType,
    });
  };

  const providerValue = useMemo(
    () => ({
      isModalOpen,
      toggleModal,
      toggleRemoveModal,
      toggleEditModal,
      modalData,
    }),
    [isModalOpen, toggleModal, modalData, toggleRemoveModal, toggleEditModal],
  );

  return (
    <ModalContext.Provider value={providerValue}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  return context;
}
