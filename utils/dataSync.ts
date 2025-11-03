
/**
 * Data synchronization utility for offline support
 */

import { storage } from './storage';
import { cache } from './cache';

interface SyncOperation {
  id: string;
  type: 'create' | 'update' | 'delete';
  collection: string;
  data: any;
  timestamp: number;
  retries: number;
}

class DataSyncManager {
  private syncQueue: SyncOperation[];
  private isSyncing: boolean;
  private maxRetries: number;
  private syncInterval: NodeJS.Timeout | null;

  constructor() {
    this.syncQueue = [];
    this.isSyncing = false;
    this.maxRetries = 3;
    this.syncInterval = null;
    this.loadSyncQueue();
  }

  /**
   * Load sync queue from storage
   */
  private async loadSyncQueue(): Promise<void> {
    const queue = await storage.get<SyncOperation[]>('@sync_queue');
    if (queue) {
      this.syncQueue = queue;
      console.log(`Loaded ${queue.length} pending sync operations`);
    }
  }

  /**
   * Save sync queue to storage
   */
  private async saveSyncQueue(): Promise<void> {
    await storage.set('@sync_queue', this.syncQueue);
  }

  /**
   * Add operation to sync queue
   */
  async addToQueue(
    type: SyncOperation['type'],
    collection: string,
    data: any
  ): Promise<void> {
    const operation: SyncOperation = {
      id: `${Date.now()}_${Math.random()}`,
      type,
      collection,
      data,
      timestamp: Date.now(),
      retries: 0,
    };

    this.syncQueue.push(operation);
    await this.saveSyncQueue();
    console.log(`Added ${type} operation for ${collection} to sync queue`);
  }

  /**
   * Process sync queue
   */
  async processQueue(): Promise<void> {
    if (this.isSyncing || this.syncQueue.length === 0) {
      return;
    }

    this.isSyncing = true;
    console.log(`Processing ${this.syncQueue.length} sync operations...`);

    const operations = [...this.syncQueue];
    const failedOperations: SyncOperation[] = [];

    for (const operation of operations) {
      try {
        await this.executeOperation(operation);
        console.log(`✓ Synced ${operation.type} for ${operation.collection}`);
        
        // Remove from queue
        this.syncQueue = this.syncQueue.filter(op => op.id !== operation.id);
      } catch (error) {
        console.error(`✗ Failed to sync ${operation.type} for ${operation.collection}:`, error);
        
        operation.retries++;
        if (operation.retries < this.maxRetries) {
          failedOperations.push(operation);
        } else {
          console.error(`Max retries reached for operation ${operation.id}`);
        }
      }
    }

    // Update queue with failed operations
    this.syncQueue = failedOperations;
    await this.saveSyncQueue();

    this.isSyncing = false;
    console.log(`Sync complete. ${this.syncQueue.length} operations remaining.`);
  }

  /**
   * Execute a single sync operation
   */
  private async executeOperation(operation: SyncOperation): Promise<void> {
    // Simulate network operation
    // In a real app, this would make API calls
    await new Promise(resolve => setTimeout(resolve, 100));

    // Update local storage
    const key = `@${operation.collection}`;
    const existing = await storage.get<any[]>(key) || [];

    switch (operation.type) {
      case 'create':
        existing.push(operation.data);
        break;
      case 'update':
        const updateIndex = existing.findIndex(item => item.id === operation.data.id);
        if (updateIndex >= 0) {
          existing[updateIndex] = operation.data;
        }
        break;
      case 'delete':
        const deleteIndex = existing.findIndex(item => item.id === operation.data.id);
        if (deleteIndex >= 0) {
          existing.splice(deleteIndex, 1);
        }
        break;
    }

    await storage.set(key, existing);
    cache.delete(key);
  }

  /**
   * Start automatic sync
   */
  startAutoSync(intervalMs: number = 30000): void {
    if (this.syncInterval) {
      return;
    }

    this.syncInterval = setInterval(() => {
      this.processQueue();
    }, intervalMs);

    console.log(`Auto-sync started with ${intervalMs}ms interval`);
  }

  /**
   * Stop automatic sync
   */
  stopAutoSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      console.log('Auto-sync stopped');
    }
  }

  /**
   * Get sync queue status
   */
  getStatus(): {
    queueLength: number;
    isSyncing: boolean;
    operations: SyncOperation[];
  } {
    return {
      queueLength: this.syncQueue.length,
      isSyncing: this.isSyncing,
      operations: [...this.syncQueue],
    };
  }

  /**
   * Clear sync queue
   */
  async clearQueue(): Promise<void> {
    this.syncQueue = [];
    await this.saveSyncQueue();
    console.log('Sync queue cleared');
  }
}

// Export singleton instance
export const dataSync = new DataSyncManager();

// Start auto-sync
dataSync.startAutoSync();
