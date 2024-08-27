import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSkill, fetchSkills } from "../../api/api";
import { ISkillResponse } from "../../types/apiTypes";
import { toast } from "react-toastify";

// types
export interface ISkillInit {
  // for single skill
  skill: ISkillResponse | null;
  loading: boolean;
  error: string | null;
  // for skills list
  skillsList: ISkillResponse[] | [];
  skillsListLoading: boolean;
  skillsListError: string | null;
}
const SkillSlice = createSlice({
  name: "skill",
  initialState: <ISkillInit>{
    skill: null,
    loading: false,
    error: null,
    // for skills list
    skillsList: [],
    skillsListLoading: false,
    skillsListError: null,
  },
  reducers: {
    // reseting the skills list
    resetSkillsList: (state) => {
      state.skillsList = [];
    },
  },
  extraReducers: (builder) => {
    // skill handlers
    builder
      .addCase(fetchSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSkill.fulfilled,
        (state, action: PayloadAction<{ data: { skill: ISkillResponse } }>) => {
          state.loading = false;
          state.skill = action.payload.data.skill;
        }
      )
      .addCase(
        fetchSkill.rejected,
        (state, action: PayloadAction<{ message: string }>) => {
          state.loading = false;
          state.error = action.payload?.message || "Failed to fetch skill";
          console.error(state.error);
          toast.error(state.error);
        }
      );
    // skills list handlers
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.skillsListLoading = true;
        state.skillsListError = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.skillsListLoading = false;
        state.skillsList = [...state.skillsList, action.payload.data.skill];
      })
      .addCase(
        fetchSkills.rejected,
        (state, action: PayloadAction<{ message: string }>) => {
          state.skillsListLoading = false;
          state.skillsListError =
            action.payload?.message || "Failed to fetch skills list";
          console.error(state.skillsListError);
          toast.error(state.skillsListError);
        }
      );
  },
});
export default SkillSlice.reducer;
export const { resetSkillsList } = SkillSlice.actions;
