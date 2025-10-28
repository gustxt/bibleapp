import { Week } from "./bible-plan-data";
import { Check, Lock } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Progress } from "./ui/progress";

interface AllWeeksViewProps {
  weeks: Week[];
  currentWeek: number;
  currentDay: number;
  completedDays: Set<string>;
  overallProgress: number;
}

export function AllWeeksView({ 
  weeks, 
  currentWeek, 
  currentDay,
  completedDays,
  overallProgress 
}: AllWeeksViewProps) {
  const isDayComplete = (weekNum: number, dayNum: number) => {
    return completedDays.has(`w${weekNum}-d${dayNum}`);
  };

  const getWeekCompletionCount = (week: Week) => {
    let completed = 0;
    week.days.forEach(day => {
      if (isDayComplete(week.week, day.day)) {
        completed++;
      }
    });
    return completed;
  };

  const isWeekInFuture = (weekNum: number) => {
    if (weekNum > currentWeek) return true;
    if (weekNum === currentWeek) return false;
    return false;
  };

  const isDayInFuture = (weekNum: number, dayNum: number) => {
    if (weekNum > currentWeek) return true;
    if (weekNum === currentWeek && dayNum > currentDay) return true;
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="rounded-xl p-5 bg-card shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold">Overall Progress</h3>
          <span className="text-lg font-bold">{Math.round(overallProgress)}%</span>
        </div>
        <Progress value={overallProgress} className="h-3" />
        <p className="text-sm opacity-70 mt-2">
          Keep going! You're making great progress through the Bible.
        </p>
      </div>

      {/* All Weeks */}
      <div>
        <h3 className="mb-4 font-bold">All Weeks</h3>
        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="space-y-3 pr-4">
            {weeks.map((week) => {
              const completedDays = getWeekCompletionCount(week);
              const totalDaysInWeek = week.days.length;
              const isFullyComplete = completedDays === totalDaysInWeek;
              const isCurrent = week.week === currentWeek;
              const isFuture = isWeekInFuture(week.week);

              return (
                <div
                  key={week.week}
                  className={`rounded-xl p-4 transition-all ${
                    isCurrent
                      ? "bg-card shadow-lg ring-2 ring-accent"
                      : isFuture
                      ? "bg-card/30 opacity-60"
                      : "bg-card shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          isFullyComplete
                            ? "bg-accent text-accent-foreground"
                            : isFuture
                            ? "bg-muted/30"
                            : "bg-muted/50"
                        }`}
                      >
                        {isFullyComplete ? (
                          <Check className="w-5 h-5" />
                        ) : isFuture ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <span>{week.week}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold">Week {week.week}</h4>
                        {isCurrent && (
                          <span className="text-xs px-2 py-0.5 bg-accent/30 rounded">
                            Current
                          </span>
                        )}
                        {isFuture && (
                          <span className="text-xs opacity-50">
                            Upcoming
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="font-bold opacity-70">
                      {completedDays}/{totalDaysInWeek}
                    </div>
                  </div>

                  {/* Day indicators */}
                  <div className="flex gap-1.5">
                    {week.days.map((day) => {
                      const complete = isDayComplete(week.week, day.day);
                      const isFutureDay = isDayInFuture(week.week, day.day);
                      const isToday = week.week === currentWeek && day.day === currentDay;

                      return (
                        <div
                          key={day.day}
                          className={`flex-1 h-2.5 rounded-full transition-all ${
                            complete
                              ? "bg-accent"
                              : isFutureDay
                              ? "bg-muted/20"
                              : isToday
                              ? "bg-accent/50 animate-pulse"
                              : "bg-muted/40"
                          }`}
                          title={`Day ${day.day} ${complete ? "✓" : isFutureDay ? "🔒" : ""}`}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
