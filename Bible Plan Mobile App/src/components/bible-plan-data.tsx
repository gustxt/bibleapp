// Bible Reading Plan Data and Utility Functions

export interface Reading {
  book: string;
  chapters: string;
}

export interface Day {
  day: number;
  readings: Reading[];
}

export interface Week {
  week: number;
  days: Day[];
}

// Actual Bible reading plan data (52 weeks, 5 days per week)
const BIBLE_PLAN_JSON = [
  {
    "week": 1,
    "readings": [
      "Genesis 1-2; Psalm 19; Mark 1",
      "Gen 3-5; Mark 2",
      "Gen 6-8; Psalm 104; Mark 3",
      "Gen 9-11; Mark 4",
      "Gen 12-15; Psalm 148; Mark 5"
    ]
  },
  {
    "week": 2,
    "readings": [
      "Genesis 16-18; Mark 6",
      "Gen 19-20; Psalm 1; Mark 7",
      "Gen 21-23; Psalm 107; Mark 8",
      "Gen 24-25; Psalm 4; Mark 9",
      "Gen 26-27; Mark 10"
    ]
  },
  {
    "week": 3,
    "readings": [
      "Genesis 28-29; Mark 11",
      "Gen 30-31; Psalm 11; Mark 12",
      "Gen 32-34; Psalm 145; Mark 13",
      "Gen 35-37; Psalm 12; Mark 14",
      "Gen 38-40; Mark 15"
    ]
  },
  {
    "week": 4,
    "readings": [
      "Genesis 41-42; Mark 16",
      "Gen 43-44; Psalm 24; Gal 1",
      "Gen 45-46; Psalm 108; Gal 2",
      "Gen 47-48; Psalm 25; Gal 3",
      "Gen 49-50; Gal 4"
    ]
  },
  {
    "week": 5,
    "readings": [
      "Exodus 1-3; Gal 5",
      "Ex 4-6; Gal 6",
      "Ex 7-9; Psalm 105; Eph 1",
      "Ex 10-12; Eph 2",
      "Ex 13-15; Psalm 114; Eph 3"
    ]
  },
  {
    "week": 6,
    "readings": [
      "Exodus 16-18; Eph 4",
      "Ex 19-21; Psalm 33; Eph 5",
      "Ex 22-24; Psalm 109; Eph 6",
      "Ex 25-27; Psalm 90; Phil 1",
      "Ex 28-31; Philippians 2"
    ]
  },
  {
    "week": 7,
    "readings": [
      "Exodus 32-34; Philippians 3",
      "Exodus 35-37; Psalm 26; Phil 4",
      "Exodus 38-40; Hebrews 1",
      "Leviticus 1-3; Psalm 27; Heb 2",
      "Lev 4-7; Heb 3"
    ]
  },
  {
    "week": 8,
    "readings": [
      "Leviticus 8-11; Ps 110; Heb 4",
      "Lev 12-14; Psalm 111; Heb 5",
      "Lev 15-18; Psalm 31; Heb 6",
      "Lev 19-20; Heb 7",
      "Lev 21-23; Heb 8"
    ]
  },
  {
    "week": 9,
    "readings": [
      "Lev 24-25; Psalm 81; Hebrews 9",
      "Lev 26-27; Psalm 112; Heb 10",
      "Numbers 1-2; Psalm 64; Heb 11",
      "Num 3-5; Heb 12",
      "Num 6-7; Heb 13"
    ]
  },
  {
    "week": 10,
    "readings": [
      "Numbers 8-11; Colossians 1",
      "Num 12-14; Psalm 28; Col 2",
      "Num 15-18; Psalm 113; Col 3",
      "Num 19-21; Col 4",
      "Num 22-25; Luke 1"
    ]
  },
  {
    "week": 11,
    "readings": [
      "Numbers 26-29; Luke 2",
      "Num 30-33; Psalm 35; Luke 3",
      "Num 34-36; Luke 4",
      "Deuteronomy 1-3; Ps 36; Luke 5",
      "Deut 4-5; Luke 6"
    ]
  },
  {
    "week": 12,
    "readings": [
      "Deuteronomy 6-9; Luke 7",
      "Deut 10-14; Psalm 5; Luke 8",
      "Deut 15-18; Psalm 115; Luke 9",
      "Deut 19-22; Psalm 6; Luke 10",
      "Deut 23-26; Luke 11"
    ]
  },
  {
    "week": 13,
    "readings": [
      "Deut 27-31; Luke 12",
      "Deut 32-34; Psalm 13; Luke 13",
      "Joshua 1-4; Psalm 143; Luke 14",
      "Joshua 5-8; Psalm 14; Luke 15",
      "Joshua 9-13; Luke 16"
    ]
  },
  {
    "week": 14,
    "readings": [
      "Joshua 14-17; Luke 17",
      "Josh 18-21; Psalm 15; Luke 18",
      "Josh 22-24; Psalm 116; Luke 19",
      "Judges 1-3; Psalm 16; Luke 20",
      "Judges 4-6; Luke 21"
    ]
  },
  {
    "week": 15,
    "readings": [
      "Judges 7-8; Luke 22",
      "Judges 9-11; Psalm 17; Luke 23",
      "Judges 12-16; Psalm 146; Luke 24",
      "Judges 17-18; Psalm 21; Acts 1",
      "Judges 19-21; Acts 2"
    ]
  },
  {
    "week": 16,
    "readings": [
      "Ruth 1-2; Acts 3",
      "Ruth 3-4; Psalm 37; Acts 4",
      "1 Samuel 1-3; Psalm 20; Acts 5",
      "1 Sam 4-5; Psalm 23; Acts 6",
      "1 Sam 6-8; Acts 7"
    ]
  },
  {
    "week": 17,
    "readings": [
      "1 Samuel 9-10; Acts 8",
      "1 Sam 11-13; Psalm 38; Acts 9",
      "1 Sam 14; Psalm 124; Acts 10",
      "1 Sam 15-16; 1 Chr 1; Ps 39; Acts 11",
      "1 Sam 17; 1 Chr 2; Acts 12"
    ]
  },
  {
    "week": 18,
    "readings": [
      "1 Sam 18-19; 1 Chr 3; Ps 59; Acts 13",
      "1 Sam 20; 1 Chr 4; Ps 56, 57, 142; Acts 14",
      "1 Sam 21-22; 1 Chr 5; Ps 52; Acts 15",
      "1 Sam 23-24; 1 Chr 6; Ps 54; Acts 16",
      "1 Sam 25; 1 Chr 7; Acts 17"
    ]
  },
  {
    "week": 19,
    "readings": [
      "1 Sam 26-27; 1 Chr 8; Acts 18",
      "1 Sam 28-29; 1 Chr 9; Acts 19",
      "1 Sam 30-31; 1 Chr 10; Acts 20",
      "2 Sam 1-2; 1 Chr 11; Ps 96, 106; Acts 21",
      "2 Sam 3-5; 1 Chr 12; Ps 122; Acts 22"
    ]
  },
  {
    "week": 20,
    "readings": [
      "2 Sam 6; 1 Chr 13; Ps 60; Acts 23",
      "1 Chron 14-16; Acts 24",
      "2 Sam 7-8; 1 Chr 17; Ps 132; Acts 25",
      "2 Sam 9-10; 1Chr 18-19; Ps 89; Acts 26",
      "2 Sam 11-12; 1Chr 20; Ps 51, 32; Acts 27"
    ]
  },
  {
    "week": 21,
    "readings": [
      "2 Samuel 13-14; Acts 28",
      "2 Sam 15-17; Psalms 3, 63; Romans 1",
      "2 Sam 18-20; Psalm 41; Romans 2",
      "2 Sam 21-23; Psalm 18; Romans 3",
      "2 Sam 24; 1 Chr 21; Romans 4"
    ]
  },
  {
    "week": 22,
    "readings": [
      "1 Chron 22-25; Psalm 78; Rom 5",
      "1 Kings 1; 1 Chr 26-28; Rom 6",
      "1 Kings 2; 1 Chr 29; Rom 7",
      "1 Kings 3; 2 Chr 1; Ps 42; Rom 8",
      "1 Kings 4; Prov 1-2; Ps 43; Rom 9"
    ]
  },
  {
    "week": 23,
    "readings": [
      "Proverbs 3-5; Romans 10",
      "Proverbs 6-7; Psalm 7; Rom 11",
      "Proverbs 8-10; Psalm 144; Rom 12",
      "Proverbs 11-13; Psalm 8; Rom 13",
      "Proverbs 14-15; Rom 14"
    ]
  },
  {
    "week": 24,
    "readings": [
      "Proverbs 16-18; Romans 15",
      "Proverbs 19-21; Ps 40; Rom 16",
      "Proverbs 22-23; Ps 117; 1 Thess 1",
      "Proverbs 24-25; Ps 41; 1 Thess 2",
      "Proverbs 26-28; 1 Thess 3"
    ]
  },
  {
    "week": 25,
    "readings": [
      "Proverbs 29-31; 1 Thess 4",
      "Song of Sol 1-3; Ps 72; 1 Thess 5",
      "Song of Sol 4-6; 2 Thess 1",
      "Song of Sol 7-8; Ps 127; 2 Thess 2",
      "1 Kings 5; 2 Chr 2; 2 Thess 3"
    ]
  },
  {
    "week": 26,
    "readings": [
      "1 Kings 6; 2 Chron 3; 1 Timothy 1",
      "1 Kings 7; 2 Chr 4; Ps 44; 1 Tim 2",
      "1 Kings 8; Psalm 30; 1 Tim 3",
      "2 Chr 5-7; Psalm 121; 1 Tim 4",
      "1 Kings 9; 2 Chr 8; 1 Tim 5"
    ]
  },
  {
    "week": 27,
    "readings": [
      "1 Kings 10-11; 2 Chr 9; 1 Tim 6",
      "Ecclesiastes 1-3; Ps 45; 2 Tim 1",
      "Eccl 4-6; Ps 125; 2 Tim 2",
      "Eccl 7-9; Ps 46; 2 Tim 3",
      "Eccl 10-12; 2 Tim 4"
    ]
  },
  {
    "week": 28,
    "readings": [
      "1 Kings 12; 2 Chr 10-11; Titus 1",
      "1 Kings 13-14; 2 Chr 12; Ps 47; Titus 2",
      "1 Kings 15; 2 Chr 13-14; Titus 3",
      "2 Chr 15-16; 1 Kin 16; Philemon",
      "1 Kin 17-18; Ps 119; Jude"
    ]
  },
  {
    "week": 29,
    "readings": [
      "1 Kin 19-21; 2 Chr 17; Ps 129; Matt 1",
      "1 Kings 22; 2 Chr 18; Matt 2",
      "2 Chr 19-20; 2 Kin 1-2; Ps 20; Matt 3",
      "2 Kings 3-4; Ps 48; Matt 4",
      "2 Kings 4-6; Matt 5"
    ]
  },
  {
    "week": 30,
    "readings": [
      "2 Kings 7-8; 2 Chr 21; Matt 6",
      "2 Kings 9-10; Psalm 49; Matt 7",
      "2 Kings 11-13; 2 Chr 22-23; Ps 131; Matt 8",
      "2 Chr 24; 2 Kin 14; Ps 50; Matt 9",
      "Joel 1-3; Matt 10"
    ]
  },
  {
    "week": 31,
    "readings": [
      "Jonah 1-4; Matthew 11",
      "2 Kings 13-14; 2 Chr 25; Ps 53; Matt 12",
      "Amos 1-3; Matt 13",
      "Amos 4-6; Psalm 55; Matt 14",
      "Amos 7-9; Matt 15"
    ]
  },
  {
    "week": 32,
    "readings": [
      "Hosea 1-3; Matthew 16",
      "Hosea 4-6; Psalm 58; Matt 17",
      "Hosea 7-10; Matt 18",
      "Hosea 11-13; Matt 19",
      "Hosea 14; 2 Chr 26-27; Ps 61; Matt 20"
    ]
  },
  {
    "week": 33,
    "readings": [
      "2 Kings 15-16; Matthew 21",
      "Isaiah 1-3; Psalm 9; Matthew 22",
      "Isaiah 4-6; Matthew 23",
      "Micah 1-4; Psalm 10; Matthew 24",
      "Micah 5-7; Matthew 25"
    ]
  },
  {
    "week": 34,
    "readings": [
      "Isaiah 7-10; Psalm 22; Matt 26",
      "Isa 11-13; Ps 118; Matt 27",
      "Isa 14-16; Matt 28",
      "Isa 17-19; Ps 62; 1 Corinthians 1",
      "Isa 20-22; 1 Corinthians 2"
    ]
  },
  {
    "week": 35,
    "readings": [
      "Isaiah 23-25; 1 Corinthians 3",
      "Isa 26-29; Psalm 65; 1 Cor 4",
      "Isa 30-32; 1 Cor 5",
      "Isa 33-35; 1 Cor 6",
      "2 Chr 28; 2 Kings 17; Ps 66; 1 Cor 7"
    ]
  },
  {
    "week": 36,
    "readings": [
      "2 Chr 29-31; 1 Corinthians 8",
      "2 Kings 18-19; 2 Chr 32; Ps 67; 1 Cor 9",
      "Isaiah 36-37; Ps 123; 1 Cor 10",
      "2 Kings 20; Isa 38-40; Ps 68; 1 Cor 11",
      "Isa 41-44; 1 Cor 12"
    ]
  },
  {
    "week": 37,
    "readings": [
      "Isaiah 45-48; 1 Corinthians 13",
      "Isa 49-52; Psalm 69; 1 Cor 14",
      "Isa 53-55; Psalm 128; 1 Cor 15",
      "Isa 56-59; Psalm 70; 1 Cor 16",
      "Isa 60-63; 2 Cor 1"
    ]
  },
  {
    "week": 38,
    "readings": [
      "Isaiah 64-66; 2 Corinthians 2",
      "2 Kings 21; 2 Chr 33; Ps 71; 2 Cor 3",
      "Nahum 1-3; Psalm 149; 2 Cor 4",
      "2 Kings 22-23; Ps 73; 2 Cor 5",
      "2 Chr 34-35; 2 Cor 6"
    ]
  },
  {
    "week": 39,
    "readings": [
      "Habakkuk 1-3; 2 Corinthians 7",
      "Zephaniah 1-3; Psalm 74; 2 Cor 8",
      "Jeremiah 1-4; Ps 130; 2 Cor 9",
      "Jer 5-7; Psalm 75; 2 Cor 10",
      "Jer 8-10; 2 Cor 11"
    ]
  },
  {
    "week": 40,
    "readings": [
      "Jeremiah 11-13; 2 Corinthians 12",
      "Jer 14-16; Psalm 76; 2 Cor 13",
      "Jer 17-20; James 1",
      "Jer 22, 23, 26; Psalm 77; James 2",
      "Jer 25, 35, 36, 45; Ps 133; James 3"
    ]
  },
  {
    "week": 41,
    "readings": [
      "Jeremiah 27, 28, 29, 24; James 4",
      "Jer 37, 21, 34; Psalm 79; James 5",
      "Jer 30-33; 1 Peter 1",
      "Jer 38, 39, 52; 1 Pet 2",
      "2 Kin 24-25; 2 Chr 36; Ps 126; 1 Pet 3"
    ]
  },
  {
    "week": 42,
    "readings": [
      "Lamentations 1-2; Ps 137; 1 Pet 4",
      "Obadiah; Jer 40-42; Ps 147; 1 Pet 5",
      "Jeremiah 43, 44, 46; 2 Peter 1",
      "Jer 47, 48, 49; Ps 80; 2 Peter 2",
      "Jer 50-51; 2 Peter 3"
    ]
  },
  {
    "week": 43,
    "readings": [
      "Ezekiel 1-3; John 1",
      "Ezekiel 4-6; Psalm 82; John 2",
      "Ezekiel 7-9; John 3",
      "Ezekiel 10-12; Psalm 83; John 4",
      "Ezekiel 13-15; Psalm 136; John 5"
    ]
  },
  {
    "week": 44,
    "readings": [
      "Ezekiel 16-18; John 6",
      "Ezekiel 19-21; Psalm 84; John 7",
      "Ezekiel 22-24; Psalm 134; John 8",
      "Ezekiel 25-27; Psalm 85; John 9",
      "Ezekiel 28-30; John 10"
    ]
  },
  {
    "week": 45,
    "readings": [
      "Ezekiel 31-33; John 11",
      "Ezekiel 34-36; Psalm 86; John 12",
      "Ezekiel 37-39; Psalm 87; John 13",
      "Ezekiel 40-42; John 14",
      "Ezekiel 43-45; Psalm 135; John 15"
    ]
  },
  {
    "week": 46,
    "readings": [
      "Ezekiel 46-48; John 16",
      "Daniel 1-3; Psalm 88; John 17",
      "Daniel 4-6; John 18",
      "Daniel 7-9; Psalm 91; John 19",
      "Daniel 10-12; John 20"
    ]
  },
  {
    "week": 47,
    "readings": [
      "Ezra 1-2; John 21",
      "Ezra 3-4; Psalm 92; 1 John 1",
      "Haggai; Zechariah 1; Ps 138; 1 John 2",
      "Zechariah 2-5; Psalm 93; 1 John 3",
      "Zechariah 6-8; 1 John 4"
    ]
  },
  {
    "week": 48,
    "readings": [
      "Zechariah 9-11; 1 John 5",
      "Zech 12-14; Psalm 94; 2 John",
      "Ezra 5-6; Psalm 95; 3 John",
      "Esther 1-3; Psalm 139; Revelation 1",
      "Esther 4-6; Revelation 2"
    ]
  },
  {
    "week": 49,
    "readings": [
      "Esther 7-10; Revelation 3",
      "Ezra 7-10; Psalm 97; Revelation 4",
      "Nehemiah 1-3; Revelation 5",
      "Neh 4-6; Psalm 98; Revelation 6",
      "Neh 7-9; Psalm 140; Revelation 7"
    ]
  },
  {
    "week": 50,
    "readings": [
      "Neh 10-13; Revelation 8",
      "Malachi; Psalm 99; Revelation 9",
      "Job 1-3; Psalm 29; Revelation 10",
      "Job 4-7; Psalm 99; Revelation 11",
      "Job 8-11; Revelation 12"
    ]
  },
  {
    "week": 51,
    "readings": [
      "Job 12-14; Psalm 100; Revelation 13",
      "Job 15-17; Revelation 14",
      "Job 18-20; Psalm 141; Revelation 15",
      "Job 21-23; Psalm 101; Revelation 16",
      "Job 24-27; Revelation 17"
    ]
  },
  {
    "week": 52,
    "readings": [
      "Job 28-30; Revelation 18",
      "Job 31-33; Psalm 102; Revelation 19",
      "Job 34-36; Revelation 20",
      "Job 37-39; Psalm 103; Revelation 21",
      "Job 40-42; Psalm 150; Revelation 22"
    ]
  }
];

// Parse a reading string like "Genesis 1-2; Psalm 19; Mark 1" into Reading objects
const parseReadingString = (readingStr: string): Reading[] => {
  const readings: Reading[] = [];
  const parts = readingStr.split(';').map(s => s.trim());
  
  for (const part of parts) {
    // Match patterns like "Genesis 1-2", "Gen 3-5", "Psalm 19", "Mark 1"
    const match = part.match(/^([A-Za-z\s]+?)\s+([\d\-,\s]+)$/);
    if (match) {
      const book = match[1].trim();
      const chapters = match[2].trim();
      readings.push({ book, chapters });
    } else {
      // Handle cases where there's just a book name (e.g., "Philemon", "Obadiah")
      readings.push({ book: part, chapters: "" });
    }
  }
  
  return readings;
};

// Generate the reading plan from JSON data
export const generateReadingPlan = (): Week[] => {
  return BIBLE_PLAN_JSON.map((weekData) => ({
    week: weekData.week,
    days: weekData.readings.map((readingStr, index) => ({
      day: index + 1, // Days 1-5
      readings: parseReadingString(readingStr),
    })),
  }));
};

// Calculate current week and day based on start date (5 days per week)
export const getCurrentWeekAndDay = (startDate: Date): { week: number; day: number } => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const diffTime = Math.abs(today.getTime() - start.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // 5-day weeks (Monday-Friday pattern)
  const week = Math.floor(diffDays / 5) + 1;
  const day = (diffDays % 5) + 1;

  return {
    week: Math.min(week, 52),
    day: Math.min(day, 5),
  };
};

// Get plan start date from localStorage or use default
export const getPlanStartDate = (): Date => {
  const stored = localStorage.getItem('biblePlanStartDate');
  if (stored) {
    return new Date(stored);
  }
  
  // Default to January 1 of current year
  const startDate = new Date(new Date().getFullYear(), 0, 1);
  localStorage.setItem('biblePlanStartDate', startDate.toISOString());
  return startDate;
};
