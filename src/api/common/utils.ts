/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from "react";

export const buildUrl = (path: string) =>
  process.env.REACT_APP_API_BASE_URL + path;
