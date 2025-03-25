export function handleError(error: unknown): string {
    if (error instanceof Error) return error.message;
    return "Erreur inconnue";
  }
  