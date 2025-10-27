'use client';
import { CButton, ControlGroup, ControlledIntField, ControlledTextField, Keydown } from '@components';
import { vnd } from '@shop/platform';
import { usePaymentService } from '../payment.service';
import { useForm } from 'react-hook-form';
import { DepositDto } from '@shop/dto';

export interface DepositProps {}

export const Deposit: FCC<DepositProps> = ({}) => {
  const { handleDeposit, loading } = usePaymentService();
  const {
    control,
    watch,
    getValues,
    handleSubmit,
    formState: {
      errors: { amount: amountError },
    },
  } = useForm<DepositDto>({
    defaultValues: {
      amount: 10000,
    },
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const _handleSubmit = () => {
    handleDeposit({ amount: getValues('amount') });
  };

  return (
    <div>
      <div className="text-2xl font-semibold mb-2">Nạp</div>
      <label htmlFor="deposit">
        Số tiền <small>({vnd(watch('amount'))})</small>
      </label>
      <Keydown.enter enter={() => handleSubmit(_handleSubmit)()}>
        <ControlGroup>
          <div className="flex-1">
            <ControlledTextField
              controller={{
                control,
                name: 'amount',
                rules: {
                  min: {
                    value: 10000,
                    message: 'Nạp tối thiểu 10.000',
                  },
                },
              }}
              textError={amountError?.message}
              component={ControlledIntField}
            />
          </div>
          <CButton
            onClick={() => handleSubmit(_handleSubmit)()}
            loading={loading}
            tabIndex={1}
            className="!border-y !w-[100px] !border-r duration-200 !border-[rgba(255,255,255,0.5)] hover:!border-[#fff]"
          >
            Nạp
          </CButton>
        </ControlGroup>
      </Keydown.enter>
    </div>
  );
};
