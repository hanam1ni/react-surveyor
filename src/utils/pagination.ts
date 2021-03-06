export interface BatchInfo {
  batch: number;
  totalBatches: number;
  batchSize: number;
  totalRecords: number;
}

export const parseBatchInfo = (meta: any): BatchInfo => ({
  batch: meta.page,
  totalBatches: meta.pages,
  batchSize: meta.pageSize,
  totalRecords: meta.records,
});
