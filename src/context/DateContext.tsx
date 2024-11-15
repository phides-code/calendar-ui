import type { ReactNode } from 'react';
import { createContext, useState } from 'react';

interface DateState {
    selectedDate: string | null;
    setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
}

const DateContext = createContext<DateState>({
    selectedDate: null,
    setSelectedDate: () => {},
});

interface DateProviderProps {
    children: ReactNode;
}

const DateProvider = ({ children }: DateProviderProps) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
            {children}
        </DateContext.Provider>
    );
};

export { DateContext, DateProvider };
