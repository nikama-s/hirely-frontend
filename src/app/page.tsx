import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { GetStartedButton } from "@/components/GetStartedButton";

export default function Home() {
  const features = [
    { icon: "📋", text: "Track your job applications" },
    { icon: "📄", text: "Analyze your resume" },
    { icon: "📊", text: "Visualize your progress" },
    { icon: "💼", text: "Prepare for interviews" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-3">
        <Typography
          variant="h2"
          component="h1"
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text font-bold"
        >
          Hirely
        </Typography>

        <Paper className="p-5 rounded-lg shadow-md max-w-lg">
          <List>
            {features.map((feature, index) => (
              <ListItem key={index}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Typography variant="h6">{feature.icon}</Typography>
                </ListItemIcon>
                <ListItemText primary={feature.text} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>

      <GetStartedButton />
    </div>
  );
}
