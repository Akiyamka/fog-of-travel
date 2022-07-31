export function createMeaningfulError(error: unknown) {
  if (error instanceof Error) {
    if (error.message) {
      return error.message;
    }
  }
  
  console.error('Can not process this error', error);
  return 'Unknown error'
}