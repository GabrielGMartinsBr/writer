import { WriterProvider } from './context/WriterContext';
import WriteController from './controller/WriteController';
import WriterView from './view/WriterView';

interface Props { }

export default function WriterPage(props: Props) {
    const { } = props;

    return (
        <WriterProvider>
            <WriteController />
            <WriterView />
        </WriterProvider>
    );
}