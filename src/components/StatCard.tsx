import type { ReactNode } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type StatCardProps = {
  label: string;
  value: string | number;
  icon: ReactNode;
};

// One summary card on the statistics page, e.g. "Customers 17"
function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", color: "text.secondary" }}>
          {icon}
          <Typography variant="body2">{label}</Typography>
        </Stack>
        <Typography variant="h4" component="p" sx={{ fontWeight: 600, mt: 1 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;
