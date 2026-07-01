/**
 * ProfileForm Component
 * Collects user data (Name, Age, Gender, Country) for personalized analysis.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import Button from '../common/Button';
import { Gender } from '@/types';
import { useForm } from 'react-hook-form';

interface ProfileFormProps {
  onSubmit: (data: ProfileFormData) => void;
  initialData?: Partial<ProfileFormData>;
}

export interface ProfileFormData {
  name: string;
  age: number;
  gender: Gender;
  country: string;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, initialData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: initialData || { gender: 'prefer-not-to-say' }
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label>What should we call you?</Label>
        <Input 
          {...register('name', { required: 'Name is required', minLength: 2 })} 
          placeholder="Enter your name"
          error={!!errors.name}
        />
        {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label>Your Real Age</Label>
        <Input 
          type="number" 
          {...register('age', { required: 'Age is required', min: 1, max: 120 })} 
          placeholder="Enter your age"
          error={!!errors.age}
        />
        {errors.age && <ErrorText>Please enter a valid age (1-120)</ErrorText>}
      </FormGroup>

      <FormGroup>
        <Label>Gender (Optional)</Label>
        <Select {...register('gender')}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </Select>
      </FormGroup>

      <Button fullWidth type="submit" size="lg">
        Start My Journey
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: ${theme.typography.fontSizes.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.textSecondary};
  margin-left: 4px;
`;

const Input = styled.input<{ error?: boolean }>`
  background: ${theme.colors.surface};
  border: 1px solid ${({ error }) => (error ? theme.colors.error : theme.colors.glassBorder)};
  border-radius: ${theme.borders.radius.md};
  padding: 16px;
  color: ${theme.colors.textMain};
  font-size: ${theme.typography.fontSizes.md};
  transition: all ${theme.transitions.default};

  &:focus {
    border-color: ${theme.colors.accent};
    background: ${theme.colors.surfaceHighlight};
    box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
  }
`;

const Select = styled.select`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.glassBorder};
  border-radius: ${theme.borders.radius.md};
  padding: 16px;
  color: ${theme.colors.textMain};
  font-size: ${theme.typography.fontSizes.md};
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;

  &:focus {
    border-color: ${theme.colors.accent};
  }
  
  option {
    background: ${theme.colors.background};
    color: ${theme.colors.textMain};
  }
`;

const ErrorText = styled.span`
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.error};
  margin-left: 4px;
`;

export default ProfileForm;
