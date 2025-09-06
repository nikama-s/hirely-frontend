"use client";

import { Button } from "@mui/material";
import { handleGetStarted } from "@/utils/auth";

export const GetStartedButton = () => {
  return (
    <Button
      variant="contained"
      size="large"
      onClick={handleGetStarted}
      className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl py-3 px-8 text-lg font-semibold shadow-md hover:shadow-lg hover:bg-blue-600 hover:to-purple-600 hover:translate-y-[-2px] transition-all ease-in-out duration-300"
    >
      Get Started ✨
    </Button>
  );
};
