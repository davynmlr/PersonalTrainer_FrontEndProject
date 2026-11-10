import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import type { Event, Formats, View } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Snackbar from "@mui/material/Snackbar";
import type { TrainingWithCustomer } from "../types/training";
import { getTrainings } from "../api/trainingsApi";
import { formatFullName } from "../utils/formatters";

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

// A training becomes a calendar event from its start date to start + duration
function toEvent(training: TrainingWithCustomer): Event {
  const start = new Date(training.date);
  const end = dayjs(start).add(training.duration, "minute").toDate();
  const customer = formatFullName(training.customer);

  return {
    title: customer ? training.activity + " / " + customer : training.activity,
    start: start,
    end: end,
  };
}

function TrainingCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState("");
  // Shown view (month/week/day/agenda) and date, changed by the calendar toolbar
  const [view, setView] = useState<View>("month");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getTrainings()
      .then((data) => setEvents(data.map(toEvent)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <div style={{ height: 650 }}>
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
        />
      </div>
      <Snackbar
        open={error !== ""}
        message={error}
        autoHideDuration={5000}
        onClose={() => setError("")}
      />
    </>
  );
}

export default TrainingCalendar;
