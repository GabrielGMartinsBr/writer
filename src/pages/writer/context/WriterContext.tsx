import { PropsWithChildren, createContext } from 'react';

function useWriterContextValue() {
    return {};
}

export type WriterContextValue = ReturnType<typeof useWriterContextValue>;

const WriterContext = createContext<WriterContextValue | undefined>(undefined);

export const WriterProvider = (props: PropsWithChildren) => {
    const { children } = props;
    const value = useWriterContextValue();
    return (
        <WriterContext.Provider value={value}>
            {children}
        </WriterContext.Provider>
    );
};