/**
 * Data Validators
 * Pure functions to validate user input and API responses.
 */

export const validators = {
  /**
   * Validates a person's name (alphanumeric, 2-30 chars).
   */
  isValidName: (name: string): boolean => {
    const trimmed = name.trim();
    return trimmed.length >= 2 && trimmed.length <= 30;
  },

  /**
   * Validates age is within a realistic range.
   */
  isValidAge: (age: number | string): boolean => {
    const num = Number(age);
    return !isNaN(num) && num >= 1 && num <= 120;
  },

  /**
   * Validates a JSON string as a valid AI analysis object.
   */
  isValidAnalysis: (data: any): boolean => {
    return (
      data &&
      typeof data.personalitySummary === 'string' &&
      Array.isArray(data.strengths) &&
      Array.isArray(data.weaknesses) &&
      typeof data.brainType === 'string'
    );
  },

  /**
   * Checks if an ID is a valid UUID format.
   */
  isValidUUID: (id: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
};
