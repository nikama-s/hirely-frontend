import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";

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

      <Button
        variant="contained"
        size="large"
        className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl py-3 px-8 text-lg font-semibold shadow-md hover:shadow-lg hover:bg-blue-600 hover:to-purple-600 hover:translate-y-[-2px] transition-all ease-in-out duration-300"
      >
        <Link href="/applications">Get Started ✨</Link>
      </Button>
    </div>
  );
}
