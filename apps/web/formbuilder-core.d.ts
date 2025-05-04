// This type declaration file helps resolve formbuilder-core imports
// when using it as a workspace package in development mode

declare module 'formbuilder-core' {
  export type FormFramework = 'next' | 'svelte' | 'vue';

  export type EnumValue = {
    label: string;
    value: string;
    id: string;
    disabled?: boolean;
  };

  export type Kind = 'heading' | 'text' | 'number' | 'boolean' | 'date' | 'enum';

  export type ChosenField<F extends FormFramework> = {
    kind: Kind;
    variant: string;
  };
  
  export type TextValidation = {
    min?: number;
    max?: number;
    isEmail?: boolean;
  };
  
  export type NumberValidation = {
    min?: number;
    max?: number;
    step?: number;
    allowNegative?: boolean;
    allowDecimal?: boolean;
  };
  
  export type BooleanValidation = {
    required?: boolean;
  };
  
  export type DateValidation = {
    minDate?: string | Date;
    maxDate?: string | Date;
    excludeDates?: Array<string | Date>;
    excludeWeekends?: boolean;
  };
  
  export type EnumValidation = {
    minSelect?: number;
    maxSelect?: number;
    unique?: boolean;
  };

  export type HeadingField<F extends FormFramework> = {
    id: string;
    key: string;
    label: string;
    kind: 'heading';
    headingLevel?: "H1" | "H2" | "H3" | "H4" | "H5" | "H6";
    variant: string;
  };
  
  export type TextField<F extends FormFramework> = {
    id: string;
    label: string;
    key: string;
    required?: boolean;
    description?: string;
    placeholder?: string;
    disabled?: boolean;
    kind: 'text';
    variant: string;
    digits?: number;
    defaultValue?: string;
    validation: TextValidation;
  };
  
  export type NumberField<F extends FormFramework> = {
    id: string;
    label: string;
    key: string;
    required?: boolean;
    description?: string;
    placeholder?: string;
    disabled?: boolean;
    kind: 'number';
    variant: string;
    defaultValue?: number;
    validation?: NumberValidation;
  };
  
  export type BooleanField<F extends FormFramework> = {
    id: string;
    label: string;
    key: string;
    required?: boolean;
    description?: string;
    placeholder?: string;
    disabled?: boolean;
    kind: 'boolean';
    variant: string;
    defaultValue?: boolean;
    validation?: BooleanValidation;
  };
  
  export type DateField<F extends FormFramework> = {
    id: string;
    label: string;
    key: string;
    required?: boolean;
    description?: string;
    placeholder?: string;
    disabled?: boolean;
    kind: 'date';
    variant: string;
    defaultValue?: number;
    validation?: DateValidation;
  };
  
  export type EnumField<F extends FormFramework> = {
    id: string;
    label: string;
    key: string;
    required?: boolean;
    description?: string;
    placeholder?: string;
    disabled?: boolean;
    kind: 'enum';
    variant: string;
    defaultValue?: string[];
    enumName?: string;
    enumValues?: EnumValue[];
    validation?: EnumValidation;
  };

  export type FormField<F extends FormFramework = FormFramework> =
    | HeadingField<F>
    | TextField<F>
    | NumberField<F>
    | BooleanField<F>
    | DateField<F>
    | EnumField<F>;

  export type Settings = {
    importAliasComponents: string;
    importAliasUtils: string;
    noDescription?: boolean;
    noPlaceholder?: boolean;
    frameworkSettings?: any;
  };

  export type FormSchema<F extends FormFramework = FormFramework> = {
    id: string;
    name: string;
    framework: F;
    fields: FormField<F>[][];
    settings: Settings;
  };

  export function randID(): string;
  
  export function generateCode(framework: FormFramework, form: FormSchema): Promise<{
    code: string;
    loc: number;
    schema: string;
  }>;
  
  export function getRequiredComponents(framework: FormFramework, fields: FormField[][]): string[];

  // Field creation functions
  export function newTextField(variant: string): TextField<any>;
  export function newNumberField(variant: string): NumberField<any>;
  export function newBooleanField(variant: string): BooleanField<any>;
  export function newDateField(variant: string): DateField<any>;
  export function newEnumField(variant: string): EnumField<any>;
  export function newHeadingField(variant: string): HeadingField<any>;

  // Re-export field variants and kinds
  export const allFieldVariants: Record<FormFramework, Record<string, any[]>>;
  export const allFieldKinds: Record<FormFramework, string[]>;
  export const allFieldVariantsByKind: Record<string, any[]>;
}