const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export class ApiError extends Error {
  statusCode: number;
  errorCode?: string;

  constructor(message: string, statusCode: number = 500, errorCode?: string) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export async function postJson<TRequest, TResponse>(
  endpoint: string,
  payload: TRequest
): Promise<TResponse> {
  // Jika endpoint internal /api/... dan API_BASE_URL tidak diatur / default, gunakan relative path Next.js
  const url = endpoint.startsWith('/') && (!API_BASE_URL || API_BASE_URL.includes('api.antiscam.id'))
    ? endpoint
    : `${API_BASE_URL.replace(/\/$/, '')}${endpoint}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let errorMessage = 'Gagal memproses analisis pesan ke server.';
      try {
        const errJson = await res.json();
        if (errJson.userFriendlyMessage) {
          errorMessage = errJson.userFriendlyMessage;
        } else if (errJson.message) {
          errorMessage = errJson.message;
        } else if (errJson.error) {
          errorMessage = errJson.error;
        }
      } catch {
        errorMessage = `Terjadi kesalahan server (${res.status}: ${res.statusText})`;
      }
      throw new ApiError(errorMessage, res.status);
    }

    return (await res.json()) as TResponse;
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      throw err;
    }
    const message =
      err instanceof Error ? err.message : 'Koneksi ke server deteksi terputus.';
    throw new ApiError(message, 500);
  }
}
