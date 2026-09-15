import { toPng } from 'html-to-image';

export async function downloadElementAsImage(
  elementId: string,
  fileName: string = 'tumbasna-report.png'
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found.`);
  }

  const dataUrl = await toPng(element, {
    quality: 0.95,
    backgroundColor: '#FFFFFF',
    cacheBust: true,
  });

  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  link.click();
}
