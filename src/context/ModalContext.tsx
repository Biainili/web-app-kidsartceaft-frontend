import { createContext, ReactNode, useContext, useState } from 'react';

//Определяем тип контекста
interface ModalContextType {
    isLogoutModalOpen: boolean;
    setLogoutModalOpen: (isOpen: boolean) => void;
}

// Создаём контекст с дефолтным значением (заглушка)
const ModalContext = createContext<ModalContextType | undefined>(undefined);


//Создаём провайдер контекста
export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Добавляем состояние модального окна
    const [isLogoutModalOpen, setLogoutModalOpen] = useState<boolean>(false);

    return (
        <ModalContext.Provider value={{ isLogoutModalOpen, setLogoutModalOpen }}>
            {children}
        </ModalContext.Provider>
    );
};


// Хук для удобного использования контекста
export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context
}
