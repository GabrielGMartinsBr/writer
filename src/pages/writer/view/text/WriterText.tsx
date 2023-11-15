import { useWriterContext } from '../../context/WriterContext';

interface Props {
}

export default function WriterText(props: Props) {
    const { } = props;
    const { elementRefs, state } = useWriterContext();

    const focused = state.focused;

    return (
        <div tw={`{
            w-full p-9
            bg-zinc-100
        }`}>

            <div tw={`{
                relative
                w-full max-w-screen-md
                mx-auto
                overflow-hidden
                border-2 border-solid
                ${focused ? 'border-zinc-500' : 'border-zinc-300'}
                transition-colors ease-out duration-75
            }`}>
                <div
                    ref={elementRefs.setter('content')}
                    tw={`{
                        relative
                        min-h-[600px]
                        m-0 p-9
                        bg-white
                    }`}
                />

                <textarea
                    ref={elementRefs.setter('textArea')}
                    tw={`{
                        absolute -z-10
                        left-[-3px] top-[-3px]
                        w-[1px] h-[1px]
                        bg-transparent text-transparent
                        border-none outline-none
                        resize-none select-none
                        overflow-hidden
                    }`}
                // tabIndex={-1}
                />
            </div>

        </div>
    );
}