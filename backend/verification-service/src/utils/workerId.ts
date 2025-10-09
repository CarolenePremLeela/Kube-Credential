// -----------------------------
// Files: backend/verification-service/src/utils/workerId.ts
// -----------------------------
export const getWorkerIdHeader = (headers: any) => {
  return headers['x-worker-id'] || headers['x-workerid'] || null;
};

