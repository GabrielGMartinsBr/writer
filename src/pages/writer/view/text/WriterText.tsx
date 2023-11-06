interface Props {
}

export default function WriterText(props: Props) {
    const { } = props;

    return (
        <div tw={`{
            w-full p-9
            bg-zinc-100
        }`}>

            <div tw={`{
                relative
                w-full max-w-screen-md
                overflow-hidden
                mx-auto p-1
                bg-zinc-500
            }`}>
                <div tw={`{
                    min-h-[600px]
                    m-0 p-9
                    bg-white
                    border border-solid
                    border-zinc-300
                }`}>
                    Text
                </div>

                <textarea
                    tw={`{
                        absolute
                        left-[-3px] top-[-3px]
                        w-[1px] h-[1px]
                        bg-transparent text-transparent
                        border-none outline-none
                        resize-none select-none
                        overflow-hidden
                    }`}
                    tabIndex={-1}
                />
            </div>

        </div>
    );
}