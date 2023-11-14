import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type IFormInputProps = {
  name: string;
} & TextFieldProps;

/**
 * A form input component that integrates with react-hook-form.
 * @param name The name of the input field.
 * @param otherProps Other props to pass to the TextField component.
 */
const FormInput: FC<IFormInputProps> = ({ name, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <TextField
          {...otherProps}
          {...field}
          error={Boolean(errors[name])}
          helperText={(errors[name]?.message as string) || ''}
        />
      )}
    />
  );
};

export default FormInput;
