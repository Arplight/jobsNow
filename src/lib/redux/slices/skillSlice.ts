import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSkill } from "../../api/api";
import { ISkillResponse } from "../../types/apiTypes";
import { toast } from "react-toastify";

// types
export interface ISkillInit {
  skill: ISkillResponse | null;
  loading: boolean;
  error: string | null;
}
const SkillSlice = createSlice({
  name: "skill",
  initialState: <ISkillInit>{
    skill: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
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
      .addCase(fetchSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch skill";
        console.error(state.error);
        toast.error(state.error);
      });
  },
});
export default SkillSlice.reducer;
