import { useEffect } from 'react';
import { useWriterContext } from '../context/WriterContext';
import { Writer } from './Writer';

interface Props { }

export default function WriteController(props: Props) {
    const { } = props;
    const { elementRefs, isReady, setIsReady, setState } = useWriterContext();

    useEffect(() => {
        const checkRefs = () => setIsReady(d => {
            const allRefsSet = !!elementRefs.textArea
                && !!elementRefs.content;
            if (d.elements !== allRefsSet) {
                d.elements = allRefsSet;
            }
        });
        const cleanup = elementRefs.listenChanges(checkRefs);
        return () => {
            cleanup();
        };
    }, []);

    useEffect(() => {
        if (!isReady) {
            return;
        }
        const w = new Writer(elementRefs);
        w.focusOutput.subscribe(b => {
            setState(d => {
                d.focused = b;
            });
        });
        return () => {
            w.cleanup();
        }
    }, [isReady]);

    return (
        <>
        </>
    );
}