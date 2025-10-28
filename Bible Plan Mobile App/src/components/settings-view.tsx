import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Calendar as CalendarIcon, RotateCcw } from "lucide-react";

interface SettingsViewProps {
  startDate: Date;
  onStartDateChange: (date: Date) => void;
}

export function SettingsView({ startDate, onStartDateChange }: SettingsViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(startDate);

  const handleSave = () => {
    onStartDateChange(selectedDate);
  };

  const handleReset = () => {
    const defaultDate = new Date(new Date().getFullYear(), 0, 1);
    setSelectedDate(defaultDate);
    onStartDateChange(defaultDate);
  };

  const hasChanged = selectedDate.getTime() !== startDate.getTime();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-bold mb-2">Settings</h2>
        <p className="opacity-70">Configure your Bible reading plan</p>
      </div>

      {/* Start Date Setting */}
      <div className="rounded-xl p-5 bg-card shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold">Plan Start Date</h3>
            <p className="text-sm opacity-70">
              When did you start this reading plan?
            </p>
          </div>
        </div>

        <div className="flex justify-center py-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-xl border border-border bg-background/50"
            disabled={(date) => date > new Date()}
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            disabled={!hasChanged}
            className="flex-1 h-12 rounded-xl"
          >
            Save Start Date
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="h-12 px-4 rounded-xl"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {hasChanged && (
          <p className="text-sm text-center opacity-70">
            You have unsaved changes
          </p>
        )}
      </div>

      {/* Current Start Date Info */}
      <div className="rounded-xl p-4 bg-secondary/30">
        <p className="text-sm opacity-70 mb-1">Current Start Date</p>
        <p className="font-bold">
          {startDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Info */}
      <div className="rounded-xl p-4 bg-muted/20 border border-border">
        <p className="text-sm opacity-70">
          <strong>Note:</strong> Changing the start date will recalculate which week and
          day you're currently on. Your completed days will remain saved.
        </p>
      </div>
    </div>
  );
}
