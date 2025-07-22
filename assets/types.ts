export interface TaskItemProps {
  id: string;
  text: string;
  completed: boolean;
  tagColor: string | null;
}

export type FilterType = "All" | "Completed" | "Incomplete";