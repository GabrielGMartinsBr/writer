import { useRefSet3 } from '@src/hooks/useRefSet3';
import { PropsWithChildren, createContext, useContext } from 'react';
import { WriterElements } from './WriterElements';

function useWriterContextValue() {
    const elementRefs = useRefSet3(WriterElements);

    return {
        elementRefs
    };
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

export function useWriterContext() {
    const ctx = useContext(WriterContext);
    if (!ctx) {
        throw new Error('The provider for WriterContext was not found.')
    }
    return ctx;
}