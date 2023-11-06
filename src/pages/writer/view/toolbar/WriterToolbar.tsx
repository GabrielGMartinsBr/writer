import ToolbarButton from './ToolbarButton';

interface Props {
}

export default function WriterToolbar(props: Props) {
    const { } = props;

    return (
        <div tw={`{
            bg-zinc-900/5
            p-1
        }`}>
            <ToolbarButton>
                New
            </ToolbarButton>

            <ToolbarButton>
                Save
            </ToolbarButton>

            <ToolbarButton>
                Open
            </ToolbarButton>

            <ToolbarButton>
                Font Name
            </ToolbarButton>

            <ToolbarButton>
                Font Size
            </ToolbarButton>

            <ToolbarButton>
                <span className='font-bold'>
                    B
                </span>
            </ToolbarButton>

            <ToolbarButton>
                <span className='font-medium italic font-mono'>
                    I
                </span>
            </ToolbarButton>

            <ToolbarButton>
                <span className='font-medium underline'>
                    S
                </span>
            </ToolbarButton>

            <ToolbarButton>
                <span className='font-medium line-through'>
                    ab
                </span>
            </ToolbarButton>

            <ToolbarButton>
                Color
            </ToolbarButton>

            <ToolbarButton>
                Highlight
            </ToolbarButton>


        </div>
    );
}