import { vndText } from '@shop/platform';

describe('FileManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('with 200.002', () => {
    const v = vndText(200_002);
    expect(v).toEqual('hai trăm nghìn không trăm linh hai');
  });

  it('with 1.200.002', () => {
    const v = vndText(1200014);
    expect(v).toEqual('một triệu hai trăm nghìn không trăm mười bốn');
  });
  it('with 19.200.002', () => {
    const v = vndText(19200014);
    expect(v).toEqual('mười chín triệu hai trăm nghìn không trăm mười bốn');
  });

  it('with 999.999.999', () => {
    const v = vndText(999999999);
    expect(v).toEqual('chín trăm chín mươi chín triệu chín trăm chín mươi chín nghìn chín trăm chín mươi chín');
  });

  it('with 9.999.999.999', () => {
    const v = vndText(9999999999);
    expect(v).toEqual('chín tỷ chín trăm chín mươi chín triệu chín trăm chín mươi chín nghìn chín trăm chín mươi chín');
  });

  it('with 0', () => {
    const v = vndText(0);
    expect(v).toEqual('');
  });
});
