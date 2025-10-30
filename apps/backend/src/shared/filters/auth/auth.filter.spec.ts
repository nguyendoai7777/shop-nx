import { UnauthorizedExceptionFilter } from './auth.filter';
import { ArgumentsHost, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { TCast } from '@shop/factory';

describe('UnauthorizedExceptionFilter', () => {
  let filter = new UnauthorizedExceptionFilter(),
    mockJson = jest.fn(),
    mockStatus = jest.fn().mockReturnValue({ json: mockJson }),
    mockResponse = { status: mockStatus },
    mockHost = TCast<ArgumentsHost>({
      switchToHttp: () => ({
        getResponse: () => mockResponse,
      }),
    });

  beforeEach(() => {});

  it('should return default unauthorized message when no message provided', () => {
    const exception = new UnauthorizedException();
    filter.catch(exception, mockHost);
    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
    expect(mockJson).toHaveBeenCalledWith({
      message: 'Unauthorized',
      code: HttpStatus.UNAUTHORIZED,
    });
  });

  it('should return custom message when provided', () => {
    const exception = new UnauthorizedException('Chưa xác thực');
    filter.catch(exception, mockHost);
    expect(mockStatus).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
    expect(mockJson).toHaveBeenCalledWith({
      message: 'Chưa xác thực',
      code: HttpStatus.UNAUTHORIZED,
    });
  });
});
