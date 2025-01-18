import { saveAs } from 'file-saver';

const accessResponse = async (res: Response): Promise<Blob> => {
  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.blob();
};

export async function downloadFile(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(`/api/${url}`, {
      ...options,
      headers: new Headers({
        accept: 'application/json',
      }),
    });

    const blob = await accessResponse(response);

    const fileName =
      response.headers.get('content-disposition')?.split('=')[1] ??
      'unknown.pdf';

    saveAs(blob, fileName);
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error('unknown error');
  }
}
