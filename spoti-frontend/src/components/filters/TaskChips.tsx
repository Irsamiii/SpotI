import { UserRound, Volume2, Wifi, Zap } from "lucide-react";

const taskItems = [
  { label: "Deep Focus", icon: Volume2, selected: true },
  { label: "Group Project", icon: UserRound, selected: false },
  { label: "Quick Laptop Session", icon: Zap, selected: false },
  { label: "Online Meeting", icon: Wifi, selected: false },
];

export function TaskChips() {
  return (
    <section className="task-section">
      <h2 className="section-heading">What are you working on?</h2>

      <div className="task-chips">
        {taskItems.map((task) => {
          const Icon = task.icon;

          return (
            <button
              className={`task-chip ${task.selected ? "selected" : ""}`}
              key={task.label}
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
