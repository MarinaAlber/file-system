import { RootState } from "@/lib/store";
import {
  addDirectories,
  setSelectedDirectory,
} from "@/lib/store/features/Directories";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

type hookProps = {
  path: string;
};
export function useFetchDirectories({ path = "/" }: hookProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(true);
  const allDirectories = useSelector(
    (state: RootState) => state.DirectoriesReducer.directories
  );
  const dispatch = useDispatch();

  const fetchAllDirectories = async () => {
    try {
      setHasError(false);
      setIsLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE}/api/directories?path=${path}`);
      const data = await response.json();
      dispatch(addDirectories({ ...data, path: data.path }));

      return data;
    } catch (error) {
      setHasError(true);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(setSelectedDirectory(path));
    if (!allDirectories || !allDirectories[path]) {
      fetchAllDirectories();
    }
  }, [path]);

  return { isLoading, hasError, data: (allDirectories && allDirectories[path]) || null };
}
