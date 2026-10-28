"use client";

import { UserRound, Volume2, Wifi, Zap } from "lucide-react";

import type { TaskType } from "@/types/spot";

type TaskChipsProps = {
  selectedTask: TaskType;
  onTaskChange: (task: TaskType) => void;
};

const taskItems: {
  label: string;
  icon: typeof Volume2;
  value: TaskType;
}[] = [
  {
    label: "Deep Focus",
    icon: Volume2,
    value: "deep-focus",
  },
  {
    label: "Group Project",
    icon: UserRound,
    value: "group-project",
  },
  {
    label: "Quick Laptop Session",
    icon: Zap,
    value: "quick-laptop",
  },
  {
    label: "Online Meeting",
    icon: Wifi,
    value: "online-meeting",
  },
];

export function TaskChips({
  selectedTask,
  onTaskChange,
}: TaskChipsProps) {
  return (
    <section className="task-section">
      <h2 className="section-heading">
        What are you working on?
      </h2>

      <div className="task-chips">
        {taskItems.map((task) => {
          const Icon = task.icon;
          const isSelected = selectedTask === task.value;

          return (
            <button
              className={`task-chip ${isSelected ? "selected" : ""}`}
              key={task.value}
              onClick={() => onTaskChange(task.value)}
              type="button"
            >
              <Icon size={15} strokeWidth={1.8} />
              <span>{task.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
