import { createContext, ReactNode, useState } from 'react';

interface DateState {
    selectedDate: Date | null;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const DateContext = createContext<DateState>({
    selectedDate: null,
    setSelectedDate: () => {},
});

interface DateProviderProps {
    children: ReactNode;
}

const DateProvider = ({ children }: DateProviderProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
            {children}
        </DateContext.Provider>
    );
};

export { DateContext, DateProvider };
