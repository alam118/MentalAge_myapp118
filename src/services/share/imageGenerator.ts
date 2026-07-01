/**
 * Image Generator Service
 * Uses html2canvas to capture DOM elements (Result Cards) and 
 * convert them into high-quality images for social media sharing.
 */

import html2canvas from 'html2canvas';

export interface ImageGeneratorOptions {
  fileName?: string;
  backgroundColor?: string;
  scale?: number; // Higher scale = better quality (e.g., 2 or 3)
}

export const imageGenerator = {
  /**
   * Captures a DOM element and returns it as a Data URL (base64).
   */
  async captureElement(
    elementId: string, 
    options: ImageGeneratorOptions = {}
  ): Promise<string | null> {
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.error(`Element with ID ${elementId} not found.`);
      return null;
    }

    try {
      // Configuration for high-quality mobile captures
      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: options.backgroundColor || '#0A0F24',
        scale: options.scale || 3, // Premium quality for social sharing
        logging: false,
        onclone: (clonedDoc) => {
          // You can modify the cloned element here before capture
          // e.g., showing hidden branding or removing interactive buttons
          const clonedElement = clonedDoc.getElementById(elementId);
          if (clonedElement) {
            clonedElement.style.borderRadius = '0px'; // Ensure crisp edges
            clonedElement.style.boxShadow = 'none';
          }
        }
      });

      return canvas.toDataURL('image/png', 1.0);
    } catch (error) {
      console.error('Error generating image:', error);
      return null;
    }
  },

  /**
   * Triggers a browser download of the generated image.
   */
  async downloadImage(elementId: string, fileName: string = 'my-mental-age.png'): Promise<boolean> {
    const dataUrl = await this.captureElement(elementId);
    
    if (!dataUrl) return false;

    try {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch (error) {
      console.error('Download failed:', error);
      return false;
    }
  },

  /**
   * Converts a Data URL to a File object.
   * Useful for using the Native Share API with an actual image file.
   */
  dataURLtoFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, { type: mime });
  }
};
