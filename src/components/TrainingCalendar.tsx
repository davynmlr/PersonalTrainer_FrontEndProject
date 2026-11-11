import { useState, useEffect } from "react";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import type { Formats, SlotInfo, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { TrainingWithCustomer } from "../types/training";
import { deleteTraining, getTrainings } from "../api/trainingsApi";
import { formatFullName } from "../utils/formatters";
import { getActivityColors } from "../utils/activityColors";
import AddTrainingDialog from "./AddTrainingDialog";
import TrainingDetails from "./TrainingDetails";

const localizer = dayjsLocalizer(dayjs);

const timeRange = ({ start, end }: { start: Date; end: Date }) =>
  dayjs(start).format("HH:mm") + " – " + dayjs(end).format("HH:mm");

// 24-hour times and DD.MM dates, like the rest of the app
const formats: Formats = {
  timeGutterFormat: "HH:mm",
  eventTimeRangeFormat: timeRange,
  agendaTimeRangeFormat: timeRange,
  dayHeaderFormat: "dddd DD.MM.YYYY",
  agendaDateFormat: "ddd DD.MM.YYYY",
};

// React Big Calendar has its own light-only CSS. These rules replace its
// colors with the MUI theme colors, so the calendar works in dark mode too.
// ("divider", "text.primary", ... change automatically with light/dark mode.)
const calendarColors = {
  color: "text.primary",
  // all lines between the days and hours
  "& .rbc-calendar *": { borderColor: "divider" },
  // days of the previous / next month in the month view
  "& .rbc-off-range-bg": { bgcolor: "action.hover" },
  "& .rbc-off-range": { color: "text.disabled" },
  // today
  "& .rbc-today": { bgcolor: "action.selected" },
  // Today / Back / Next and Month / Week / Day / Agenda buttons
  "& .rbc-toolbar button": { color: "text.primary" },
  "& .rbc-toolbar button:hover, & .rbc-toolbar button:focus": {
    bgcolor: "action.hover",
  },
  "& .rbc-toolbar button.rbc-active": { bgcolor: "action.selected" },
};

// One training shown in the calendar
type TrainingEvent = {
  title: string;
  start: Date;
  end: Date;
  training: TrainingWithCustomer;
};

// A training becomes a calendar event from its start date to start + duration
function toEvent(training: TrainingWithCustomer): TrainingEvent {
  const start = new Date(training.date);
  const end = dayjs(start).add(training.duration, "minute").toDate();
  const customer = formatFullName(training.customer);

  return {
    title: customer ? training.activity + " / " + customer : training.activity,
    start: start,
    end: end,
    training: training,
  };
}

function TrainingCalendar() {
  const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);
  const [message, setMessage] = useState("");
  // Shown view (month/week/day/agenda) and date, changed by the calendar toolbar
  const [view, setView] = useState<View>("month");
  const [date, setDate] = useState(new Date());
  // Clicked empty time (opens the "new training" dialog)
  const [newTrainingStart, setNewTrainingStart] = useState<Dayjs | null>(null);
  // Clicked training (opens the details dialog)
  const [selectedTraining, setSelectedTraining] =
    useState<TrainingWithCustomer | null>(null);

  const fetchTrainings = () => {
    getTrainings()
      .then((data) => setTrainings(data))
      .catch((err) => setMessage(err.message));
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const events = trainings.map(toEvent);
  const colors = getActivityColors(trainings.map((training) => training.activity));

  const handleSelectSlot = (slot: SlotInfo) => {
    let start = dayjs(slot.start);
    // In the month view a click gives only the day (00:00), so suggest 09:00
    if (view === "month") {
      start = start.hour(9).minute(0);
    }
    setNewTrainingStart(start);
  };

  const handleDelete = () => {
    if (!selectedTraining) return;

    deleteTraining(selectedTraining.id)
      .then(() => {
        fetchTrainings();
        setMessage("Training deleted");
      })
      .catch((err) => setMessage(err.message));
    setSelectedTraining(null);
  };

  return (
    <>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Click an empty time to add a training. Click a training to see its
        details or delete it.
      </Typography>

      {/* Color legend: one chip per activity */}
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mb: 1 }}>
        {Object.entries(colors).map(([activity, color]) => (
          <Chip
            key={activity}
            label={activity}
            size="small"
            sx={{ bgcolor: color, color: "white" }}
          />
        ))}
      </Stack>

      <Box sx={{ height: 650, ...calendarColors }}>
        <Calendar
          localizer={localizer}
          events={events}
          formats={formats}
          views={["month", "week", "day", "agenda"]}
          view={view}
          onView={(newView) => setView(newView)}
          date={date}
          onNavigate={(newDate) => setDate(newDate)}
          scrollToTime={new Date(1970, 0, 1, 7)}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={(event) => setSelectedTraining(event.training)}
          eventPropGetter={(event) => ({
            style: { backgroundColor: colors[event.training.activity], border: "none" },
          })}
        />
      </Box>

      {newTrainingStart && (
        <AddTrainingDialog
          start={newTrainingStart}
          onClose={() => setNewTrainingStart(null)}
          onAdded={fetchTrainings}
          showMessage={setMessage}
        />
      )}

      {selectedTraining && (
        <TrainingDetails
          training={selectedTraining}
          color={colors[selectedTraining.activity]}
          onClose={() => setSelectedTraining(null)}
          onDelete={handleDelete}
        />
      )}

      <Snackbar
        open={message !== ""}
        message={message}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
      />
    </>
  );
}

export default TrainingCalendar;
