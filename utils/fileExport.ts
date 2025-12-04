
/**
 * Native (iOS/Android) file export utilities
 * This is a fallback for non-web platforms
 */

import { Platform, Share } from 'react-native';
import { storage } from './storage';

export interface ExportOptions {
  filename: string;
  mimeType?: string;
  data: string | Blob | ArrayBuffer;
}

/**
 * Download a file (not supported on native, use share instead)
 */
export const downloadFile = async (options: ExportOptions): Promise<void> => {
  console.log('downloadFile not supported on native platform, use shareData instead');
  // On native, we would use expo-file-system and expo-sharing
  throw new Error('downloadFile not supported on native platform');
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
    
    // On native, we would save to file system and share
    console.log('App data ready for export:', jsonString.length, 'bytes');
    
    // Use Share API as fallback
    await Share.share({
      message: jsonString,
      title: 'Moto3 Trainer Data Export',
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
export const importAppData = async (file: any): Promise<void> => {
  console.log('importAppData not fully supported on native platform');
  throw new Error('importAppData not fully supported on native platform');
};

/**
 * Export data as CSV
 */
export const exportAsCSV = async (
  data: Array<Record<string, unknown>>,
  filename: string
): Promise<void> => {
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
          const stringValue = String(value ?? '');
          if (stringValue.includes(',') || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        }).join(',')
      ),
    ];

    const csvContent = csvRows.join('\n');

    // Use Share API
    await Share.share({
      message: csvContent,
      title: `${filename}.csv`,
    });

    console.log(`CSV exported: ${filename}`);
  } catch (error) {
    console.error('Error exporting CSV:', error);
    throw error;
  }
};

/**
 * Export data as PDF
 */
export const exportAsPDF = async (
  content: string,
  filename: string
): Promise<void> => {
  console.log('exportAsPDF not fully supported on native platform');
  throw new Error('exportAsPDF not fully supported on native platform');
};

/**
 * Share data using native Share API
 */
export const shareData = async (options: {
  title?: string;
  text?: string;
  url?: string;
}): Promise<void> => {
  try {
    await Share.share({
      message: options.text || options.url || '',
      title: options.title,
      url: options.url,
    });
    console.log('Data shared successfully');
  } catch (error) {
    console.error('Error sharing data:', error);
    throw error;
  }
};

/**
 * Copy text to clipboard (not supported on native without additional library)
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  console.log('copyToClipboard requires expo-clipboard on native platform');
  throw new Error('copyToClipboard not supported on native platform');
};
