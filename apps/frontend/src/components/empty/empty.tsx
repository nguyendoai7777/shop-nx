export interface EmptyProps {
  when: boolean;
  defaultClassName?: boolean;
}

export const Empty: FCC<EmptyProps> = ({ when, children, className, defaultClassName = false }) => {
  const defToken = defaultClassName ? '' : `flex justify-center`;
  return when ? <div className={`${defToken} ${className ?? ''}`}>{children}</div> : <></>;
};
