import styles from './IconButton.module.css';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

const IconButton = ({children, ...attrs}: IconButtonProps) => {
    return <button className={styles.component} {...attrs}>{children}</button>
}

export default IconButton;