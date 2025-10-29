export interface SpinProps {
  /**
   * css
   * @example
   * */
  size?: string;
}

export const XIndicatorSpin: FCC<SpinProps> = ({ size = '50px' }) => {
  return (
    <>
      <div className="Indicator XIndicator-spin" style={{ width: size, height: size, minWidth: size }}></div>
    </>
  );
};
