import { useState, useEffect } from "react";
import { Moon, Sun, BookOpen, Calendar, Check, Settings } from "lucide-react";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { AllWeeksView } from "./components/all-weeks-view";
import { SettingsView } from "./components/settings-view";
import { WeekOverview } from "./components/week-overview";
import {
  generateReadingPlan,
  getCurrentWeekAndDay,
  getPlanStartDate,
  Week,
} from "./components/bible-plan-data";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [completedDays, setCompletedDays] = useState<Set<string>>(new Set());
  const [readingPlan, setReadingPlan] = useState<Week[]>([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [activeTab, setActiveTab] = useState("today");
  const [startDate, setStartDate] = useState<Date>(new Date());

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("biblePlanTheme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Initialize reading plan and current position
  useEffect(() => {
    const plan = generateReadingPlan();
    setReadingPlan(plan);

    const loadedStartDate = getPlanStartDate();
    setStartDate(loadedStartDate);
    const { week, day } = getCurrentWeekAndDay(loadedStartDate);
    setCurrentWeek(week);
    setCurrentDay(day);
  }, []);

  // Recalculate current week/day when start date changes
  const handleStartDateChange = (newStartDate: Date) => {
    setStartDate(newStartDate);
    localStorage.setItem('biblePlanStartDate', newStartDate.toISOString());
    const { week, day } = getCurrentWeekAndDay(newStartDate);
    setCurrentWeek(week);
    setCurrentDay(day);
  };

  // Load completed days from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("biblePlanCompletedDays");
    if (saved) {
      try {
        const parsedArray = JSON.parse(saved);
        setCompletedDays(new Set(parsedArray));
      } catch (e) {
        console.error("Failed to parse saved days", e);
      }
    }
  }, []);

  // Save completed days to localStorage
  useEffect(() => {
    if (completedDays.size > 0) {
      localStorage.setItem(
        "biblePlanCompletedDays",
        JSON.stringify(Array.from(completedDays))
      );
    }
  }, [completedDays]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("biblePlanTheme", newTheme);
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTodayComplete = () => {
    const dayId = `w${currentWeek}-d${currentDay}`;
    setCompletedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dayId)) {
        newSet.delete(dayId);
      } else {
        newSet.add(dayId);
      }
      return newSet;
    });
  };

  const toggleDayComplete = (weekNum: number, dayNum: number) => {
    const dayId = `w${weekNum}-d${dayNum}`;
    setCompletedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(dayId)) {
        newSet.delete(dayId);
      } else {
        newSet.add(dayId);
      }
      return newSet;
    });
  };

  // Calculate overall progress
  const calculateProgress = () => {
    if (readingPlan.length === 0) return 0;
    
    // Total days up to current week and day (5 days per week)
    let totalDays = (currentWeek - 1) * 5 + currentDay;
    let completedCount = 0;

    for (let w = 1; w <= currentWeek; w++) {
      const maxDay = w === currentWeek ? currentDay : 5;
      for (let d = 1; d <= maxDay; d++) {
        const dayId = `w${w}-d${d}`;
        if (completedDays.has(dayId)) {
          completedCount++;
        }
      }
    }

    return totalDays > 0 ? (completedCount / totalDays) * 100 : 0;
  };

  const currentWeekData = readingPlan.find((w) => w.week === currentWeek);
  const todayData = currentWeekData?.days.find((d) => d.day === currentDay);
  const isTodayComplete = completedDays.has(`w${currentWeek}-d${currentDay}`);
  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl">Bible Plan</h1>
                <p className="text-sm opacity-70">Your daily reading</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto pb-20">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
          <div className="max-w-2xl mx-auto px-4 py-6">

            <TabsContent value="today" className="mt-0">
              {todayData && currentWeekData && (
                <div className="space-y-6">
                  {/* Day Header */}
                  <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full">
                      <span className="opacity-70">Week {currentWeek}</span>
                      <span className="opacity-30">•</span>
                      <span className="font-bold">Day {currentDay}</span>
                    </div>
                    <h2 className="text-3xl">Today's Reading</h2>
                  </div>

                  {/* Reading List */}
                  <div className="rounded-2xl p-6 bg-card shadow-lg space-y-4">
                    {todayData.readings.map((reading, index) => (
                      <div
                        key={index}
                        className={`flex items-start gap-3 p-4 rounded-xl bg-secondary/30 transition-opacity ${
                          isTodayComplete ? "opacity-50" : ""
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold">{reading.book}</h3>
                          <p className="opacity-70">
                            {reading.chapters && `Chapter ${reading.chapters}`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Complete Button */}
                  <Button
                    onClick={toggleTodayComplete}
                    size="lg"
                    className={`w-full h-16 text-lg rounded-2xl transition-all ${
                      isTodayComplete
                        ? "bg-accent hover:bg-accent/90"
                        : "bg-primary hover:bg-primary/90"
                    }`}
                  >
                    {isTodayComplete ? (
                      <>
                        <Check className="w-6 h-6 mr-2" />
                        Completed Today!
                      </>
                    ) : (
                      <>
                        <Check className="w-6 h-6 mr-2" />
                        Mark as Complete
                      </>
                    )}
                  </Button>

                  {isTodayComplete && (
                    <p className="text-center opacity-70 text-sm">
                      Great job! Come back tomorrow for your next reading.
                    </p>
                  )}

                  {/* Week Overview - Collapsible */}
                  <WeekOverview
                    week={currentWeekData}
                    currentDay={currentDay}
                    completedDays={completedDays}
                    onToggleDay={toggleDayComplete}
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="weeks" className="mt-0">
              <AllWeeksView
                weeks={readingPlan}
                currentWeek={currentWeek}
                currentDay={currentDay}
                completedDays={completedDays}
                overallProgress={progress}
              />
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <SettingsView
                startDate={startDate}
                onStartDateChange={handleStartDateChange}
              />
            </TabsContent>
          </div>

          {/* Bottom Tab Bar - Fixed at bottom */}
          <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border safe-area-bottom">
            <div className="max-w-2xl mx-auto px-4 py-3">
              <TabsList className="grid w-full grid-cols-3 h-14">
                <TabsTrigger value="today" className="gap-2 flex-col h-full">
                  <BookOpen className="w-5 h-5" />
                  <span className="text-xs">Today</span>
                </TabsTrigger>
                <TabsTrigger value="weeks" className="gap-2 flex-col h-full">
                  <Calendar className="w-5 h-5" />
                  <span className="text-xs">Weeks</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2 flex-col h-full">
                  <Settings className="w-5 h-5" />
                  <span className="text-xs">Settings</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </Tabs>
      </div>

      {/* iOS PWA optimizations */}
      <style>{`
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
        
        /* iOS PWA optimizations */
        @supports (-webkit-touch-callout: none) {
          .min-h-screen {
            min-height: -webkit-fill-available;
          }
        }
      `}</style>
    </div>
  );
}
