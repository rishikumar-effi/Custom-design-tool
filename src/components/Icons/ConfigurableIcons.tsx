const LeftAlign = () => <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path d="M32 68a8 8 0 0 1 8-8h176a8 8 0 0 1 0 16H40a8 8 0 0 1-8-8Zm184 32H88a8 8 0 0 0 0 16h128a8 8 0 0 0 0-16Zm0 40H40.006a8 8 0 1 0 0 16H216a8 8 0 0 0 0-16Zm0 40H88.006a8 8 0 1 0 0 16H216a8 8 0 0 0 0-16Z" /></svg>;

const CenterAlign = () => <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path d="M32 68a8 8 0 0 1 8-8h176a8 8 0 0 1 0 16H40a8 8 0 0 1-8-8Zm32 32a8 8 0 0 0 0 16h128a8 8 0 0 0 0-16Zm151.997 40H40.003a8 8 0 1 0 0 16h175.994a8 8 0 0 0 0-16Zm-24 40H64.003a8 8 0 0 0 0 16h127.994a8 8 0 0 0 0-16Z" /></svg>;

const RightAlign = () => <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path d="M32.023 68a8 8 0 0 1 8-8h176a8 8 0 0 1 0 16h-176a8 8 0 0 1-8-8Zm8 48h128a8 8 0 0 0 0-16h-128a8 8 0 1 0 0 16Zm176 24H40.03a8 8 0 0 0 0 16h175.994a8 8 0 0 0 0-16Zm-48 40H40.03a8 8 0 0 0 0 16h127.994a8 8 0 0 0 0-16Z" /></svg>

export const ConfigurableIcons = {LeftAlign, CenterAlign, RightAlign};