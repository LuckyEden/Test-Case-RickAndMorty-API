/* Component props types */


export declare namespace TCTypes {
    export type LayoutProps = {
        children: React.ReactNode;
    }

    export type DividerProps = {
        orientation?: "horizontal" | "vertical";
        flexItem?: boolean;
        textAlign?: "center" | "left" | "right";
        variant?: "fullWidth" | "inset" | "middle";
        light?: boolean;
        children?: React.ReactNode;
    }

    export type SearchCardWrapperProps = {
        children: React.ReactNode;
        targetLink?: string;
    }

    export type SearchCardProps = {
        data: any;
    }

    export type TooltipProps = {
        title: string;
        children: React.ReactNode;
    }

    export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
        options: { label: string, value: string }[];
        value: string;
        Label?: string;
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    }

    export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
        open: boolean;
        onClose: () => void;
        children: React.ReactNode;
    }

    export type EpisodeCardProps = {
        episode: any;
    }
}