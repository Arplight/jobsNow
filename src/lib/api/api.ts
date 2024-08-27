import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IJob, IJobsResponse } from "../types/apiTypes";

// base url
const BASE_URL: string = "https://skills-api-zeta.vercel.app/";

// All jobs endpoint
export const fetchJobs = createAsyncThunk<
  IJobsResponse,
  number,
  { rejectValue: { message: string } }
>("jobs/allJobs", async (nextJobs, { rejectWithValue }) => {
  try {
    const response = await axios.get<IJobsResponse>(`${BASE_URL}jobs`, {
      params: { limit: 12, cursor: nextJobs },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({ message: error.message });
    } else {
      return rejectWithValue({ message: "An unexpected error occurred." });
    }
  }
});

// search endpoint
export const fetchSearchJobs = createAsyncThunk<
  IJobsResponse,
  string,
  { rejectValue: { message: string } }
>("jobs/search", async (searchQuery, { rejectWithValue }) => {
  try {
    const response = await axios.get<IJobsResponse>(`${BASE_URL}jobs/search`, {
      params: { query: searchQuery.toLowerCase() },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue({ message: error.message });
    } else {
      return rejectWithValue({ message: "An unexpected error occurred." });
    }
  }
});

// single job endpoint
export const fetchJob = createAsyncThunk(
  "jobs/singleJob",
  async (jobId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}job/${jobId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          message: error.response?.data?.error?.message || "An error occurred.",
        });
      } else {
        return rejectWithValue({ message: "An unexpected error occurred." });
      }
    }
  }
);

// single job endpoint(for batch requests)
export const fetchJobList = createAsyncThunk<
  IJob,
  string | undefined,
  { rejectValue: { message: string } }
>("jobs/jobList", async (jobId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}job/${jobId}`);
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
export const fetchSkill = createAsyncThunk(
  "skills/singleSkill",
  async (skillId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}skill/${skillId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          message: error.response?.data?.error?.message,
        });
      } else {
        return rejectWithValue({ message: "An unexpected error occurred." });
      }
    }
  }
);

export const fetchSkills = createAsyncThunk(
  "skills/Skills",
  async (skillId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}skill/${skillId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          message: error.response?.data?.error?.message,
        });
      } else {
        return rejectWithValue({ message: "An unexpected error occurred." });
      }
    }
  }
);
