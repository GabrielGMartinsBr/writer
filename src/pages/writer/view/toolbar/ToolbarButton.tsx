import { PropsWithChildren } from 'react';

interface Props {
    onClick?: () => void;
}

export default function ToolbarButton(props: PropsWithChildren<Props>) {
    const { children, onClick } = props;

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    }

    return (
        <button
            tw={`{
                bg-transparent
                m-1 px-3 py-2
                text-zinc-600 
                text-sm rounded-lg
                font-medium

                transition-colors
                
                hover:{
                    bg-black/10
                }
                active:{
                    opacity-60
                }
            }`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
}