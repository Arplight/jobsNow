import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IJobsResponse, ISkillResponse } from "../types/apiTypes";

// base url
const BASE_URL: string = "https://skills-api-zeta.vercel.app/";

// All jobs endpoint
interface FetchJobsParams {
  nextJobs?: number;
  searchQuery?: string;
}
export const fetchJobs = createAsyncThunk<
  IJobsResponse,
  FetchJobsParams,
  { rejectValue: { message: string } }
>("jobs/allJobs", async ({ nextJobs, searchQuery }, { rejectWithValue }) => {
  try {
    const response = await axios.get<IJobsResponse>(
      `${BASE_URL}jobs${searchQuery ? "/search" : ""}`,
      {
        params: { limit: 12, cursor: nextJobs, query: searchQuery },
      }
    );
    if (searchQuery && searchQuery?.length > 0) {
      return { data: response.data, withSearch: true };
    } else {
      return { data: response.data, withSearch: false };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({ message: error.message });
    } else {
      return rejectWithValue({ message: "An unexpected error occurred." });
    }
  }
});

// single job endpoint
export const fetchJob = createAsyncThunk<
  IJobsResponse,
  string | undefined,
  { rejectValue: { message: string } }
>("jobs/singleJob", async (jobId, { rejectWithValue }) => {
  try {
    const response = await axios.get<IJobsResponse>(`${BASE_URL}job/${jobId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({ message: error.response?.data?.error?.message });
    } else {
      return rejectWithValue({ message: "An unexpected error occurred." });
    }
  }
});

// skill endpoint
export const fetchSkill = createAsyncThunk<
  ISkillResponse,
  string | undefined,
  { rejectValue: { message: string } }
>("skills/singleSkill", async (skillId, { rejectWithValue }) => {
  try {
    const response = await axios.get<ISkillResponse>(
      `${BASE_URL}skill/${skillId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({ message: error.response?.data?.error?.message });
    } else {
      return rejectWithValue({ message: "An unexpected error occurred." });
    }
  }
});
