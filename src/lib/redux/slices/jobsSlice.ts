import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchJobs } from "../../api/api";
import { IJob, IJobsResponse, JobsMeta } from "../../types/apiTypes";
import { toast } from "react-toastify";

// types
export interface IJobsInit {
  jobs: IJob[] | null;
  meta: JobsMeta | null;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}

// Define a payload type that includes withSearch
interface FetchJobsPayload {
  data: IJobsResponse;
  withSearch: boolean;
}

const JobsSlice = createSlice({
  name: "jobs",
  initialState: <IJobsInit>{
    jobs: null,
    meta: null,
    loading: false,
    error: null,
    hasMore: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchJobs.fulfilled,
        (state, action: PayloadAction<FetchJobsPayload>) => {
          state.loading = false;

          if (action.payload.withSearch) {
            state.jobs = action.payload.data.data.jobs;
          } else {
            state.jobs = state.jobs
              ? [...state.jobs, ...action.payload.data.data.jobs]
              : action.payload.data.data.jobs;
          }

          state.meta = action.payload.data.data.meta;
          state.hasMore = !!action.payload.data.data.meta.next;
        }
      )
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch jobs";
        console.error(state.error);
        toast.error(state.error);
      });
  },
});

export default JobsSlice.reducer;
