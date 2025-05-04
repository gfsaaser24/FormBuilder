declare module 'formbuilder-core' {
  export type FormFramework = 'next' | 'svelte' | 'vue';
  
  export type FrameworkFieldKinds = {
    next: string;
    svelte: string;
    vue: string;
  };
  
  export type FrameworkFieldVariants = {
    next: string;
    svelte: string;
    vue: string;
  };
  
  export const allFieldVariants: any;
  export const allFieldVariantsByKind: any;
  export const allFieldKinds: Record<FormFramework, string[]>;
  
  export type TextValidation = {
    min?: number;
    max?: number;
    regex?: string;
  };
  
  export type NumberValidation = {
    min?: number;
    max?: number;
  };
  
  export type DateValidation = {
    minDate?: string;
    maxDate?: string;
  };
  
  export type BooleanValidation = {
    required?: boolean;
  };
  
  export type EnumValidation = {
    required?: boolean;
    options: Array<{ label: string; value: string }>;
  };
  
  export type FormField<F extends FormFramework = FormFramework> = {
    id: string;
    kind: string;
    variant: string;
    label: string;
    key: string;
    required?: boolean;
    placeholder?: string;
    description?: string;
    validation?: TextValidation | NumberValidation | DateValidation | BooleanValidation | EnumValidation;
  };
  
  export type FormSchema<F extends FormFramework = FormFramework> = {
    id: string;
    name: string;
    framework: F;
    fields: FormField<F>[][];
    settings: {
      importAliasComponents: string;
      importAliasUtils: string;
      noDescription: boolean;
      noPlaceholder: boolean;
    };
  };
  
  export type ChosenField<F extends FormFramework = FormFramework> = {
    kind: string;
    variant: string;
  };
  
  export function randID(): string;
  
  export function newTextField(variant: string): Partial<FormField>;
  export function newNumberField(variant: string): Partial<FormField>;
  export function newBooleanField(variant: string): Partial<FormField>;
  export function newEnumField(variant: string): Partial<FormField>;
  export function newDateField(variant: string): Partial<FormField>;
  export function newHeadingField(variant: string): Partial<FormField>;
}