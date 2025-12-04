
/**
 * Web-specific file export utilities
 * Handles downloading files in the browser
 */

import { storage } from './storage';

export interface ExportOptions {
  filename: string;
  mimeType?: string;
  data: string | Blob | ArrayBuffer;
}

/**
 * Download a file in the browser
 */
export const downloadFile = (options: ExportOptions): void => {
  const { filename, mimeType = 'application/octet-stream', data } = options;

  try {
    let blob: Blob;

    if (data instanceof Blob) {
      blob = data;
    } else if (data instanceof ArrayBuffer) {
      blob = new Blob([data], { type: mimeType });
    } else {
      blob = new Blob([data], { type: mimeType });
    }

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);

    console.log(`File downloaded: ${filename}`);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

/**
 * Export all app data as JSON
 */
export const exportAppData = async (): Promise<void> => {
  try {
    const { data, error } = await storage.exportData();

    if (error || !data) {
      throw new Error('Failed to export data');
    }

    const jsonString = JSON.stringify(data, null, 2);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `moto3-trainer-backup-${timestamp}.json`;

    downloadFile({
      filename,
      mimeType: 'application/json',
      data: jsonString,
    });

    console.log('App data exported successfully');
  } catch (error) {
    console.error('Error exporting app data:', error);
    throw error;
  }
};

/**
 * Import app data from JSON file
 */
export const importAppData = async (file: File): Promise<void> => {
  try {
    const text = await file.text();
    const data = JSON.parse(text);

    const { error } = await storage.importData(data);

    if (error) {
      throw new Error('Failed to import data');
    }

    console.log('App data imported successfully');
  } catch (error) {
    console.error('Error importing app data:', error);
    throw error;
  }
};

/**
 * Export data as CSV
 */
export const exportAsCSV = (
  data: Array<Record<string, unknown>>,
  filename: string
): void => {
  try {
    if (data.length === 0) {
      throw new Error('No data to export');
    }

    // Get headers from first object
    const headers = Object.keys(data[0]);
    
    // Create CSV content
    const csvRows = [
      headers.join(','), // Header row
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape quotes and wrap in quotes if contains comma
          const stringValue = String(value ?? '');
          if (stringValue.includes(',') || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        }).join(',')
      ),
    ];

    const csvContent = csvRows.join('\n');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const csvFilename = `${filename}-${timestamp}.csv`;

    downloadFile({
      filename: csvFilename,
      mimeType: 'text/csv',
      data: csvContent,
    });

    console.log(`CSV exported: ${csvFilename}`);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    throw error;
  }
};

/**
 * Export data as PDF (requires additional library)
 */
export const exportAsPDF = async (
  content: string,
  filename: string
): Promise<void> => {
  try {
    // For now, just export as text file
    // In a real implementation, you would use a library like jsPDF
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const pdfFilename = `${filename}-${timestamp}.txt`;

    downloadFile({
      filename: pdfFilename,
      mimeType: 'text/plain',
      data: content,
    });

    console.log(`PDF exported: ${pdfFilename}`);
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
};

/**
 * Share data using Web Share API (if available)
 */
export const shareData = async (options: {
  title?: string;
  text?: string;
  url?: string;
  files?: File[];
}): Promise<void> => {
  try {
    if (!navigator.share) {
      throw new Error('Web Share API not supported');
    }

    await navigator.share(options);
    console.log('Data shared successfully');
  } catch (error) {
    console.error('Error sharing data:', error);
    throw error;
  }
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    console.log('Text copied to clipboard');
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    throw error;
  }
};
