export * from './ToolBarIcons';

type IconType = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

export const Icon = ({ children, ...rest }: IconType) => <div {...rest}>{children}</div>;

