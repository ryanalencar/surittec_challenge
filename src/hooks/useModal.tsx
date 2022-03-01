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

export interface IModalContextData {
  isModalOpen: boolean;
  toggleModal: () => void;
}

const ModalContext = createContext<IModalContextData>({} as IModalContextData);

export function ModalProvider({ children }: IModalProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    if (isModalOpen) setIsModalOpen(false);
    else setIsModalOpen(true);
  };

  const providerValue = useMemo(
    () => ({ isModalOpen, toggleModal }),
    [isModalOpen, toggleModal],
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
