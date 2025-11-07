interface Staff {
  id: string;
  name: string;
  role: string;
  specialty: string;
  availability: string;
}

interface ScheduleEntry {
  day: string;
  doctor: string;
  shift: string;
}

export function generateSchedule(staffList: Staff[]): ScheduleEntry[] {
  const shifts = ['Morning', 'Evening', 'Night'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const schedule: ScheduleEntry[] = [];

  // Filter only doctors and nurses for scheduling
  const medicalStaff = staffList.filter(s => s.role === 'Doctor' || s.role === 'Nurse');

  for (const day of days) {
    for (const shift of shifts) {
      // Randomly assign staff to shifts
      const randomStaff = medicalStaff[Math.floor(Math.random() * medicalStaff.length)];
      schedule.push({
        day,
        doctor: randomStaff.name,
        shift
      });
    }
  }

  return schedule;
}

// Simulate Hugging Face API delay
export async function generateScheduleAsync(staffList: Staff[]): Promise<ScheduleEntry[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateSchedule(staffList));
    }, 1500);
  });
}
