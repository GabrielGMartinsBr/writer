import WriterText from './text/WriterText';
import WriterToolbar from './toolbar/WriterToolbar';

interface Props {
}

export default function WriterView(props: Props) {
    const { } = props;

    return (
        <div tw={`{
            w-full max-w-screen-xl
            mx-auto my-0
            
            bg-zinc-100
        }`}>
            <WriterToolbar />
            <WriterText />
        </div>
    );
}