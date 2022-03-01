import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';

interface IModalProviderProps {
  children: ReactNode;
}

interface ModalData {
  editing: boolean;
  deleting: boolean;
  data?: any;
}

export interface IModalContextData {
  isModalOpen: boolean;
  modalData: ModalData;
  toggleModal: () => void;
  toggleEditModal: (data: any) => void;
  toggleRemoveModal: (data: any) => void;
}

const ModalContext = createContext<IModalContextData>({} as IModalContextData);

export function ModalProvider({ children }: IModalProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({
    editing: false,
    deleting: false,
    data: {} as any,
  });

  const toggleModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      setModalData({
        editing: false,
        deleting: false,
        data: {} as any,
      });
    } else setIsModalOpen(true);
  };

  const toggleEditModal = (data: any) => {
    toggleModal();
    setModalData({
      deleting: false,
      editing: true,
      data,
    });
  };

  const toggleRemoveModal = (data: any) => {
    toggleModal();
    setModalData({
      deleting: true,
      editing: false,
      data,
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
