import { parseBatchInfo } from './pagination';

describe('parseBatchInfo', () => {
  it('returns valid batch info', () => {
    const meta = {
      page: 1,
      pages: 2,
      pageSize: 5,
      records: 6,
    };

    expect(parseBatchInfo(meta)).toMatchObject({
      batch: 1,
      totalBatches: 2,
      batchSize: 5,
      totalRecords: 6,
    });
  });
});
