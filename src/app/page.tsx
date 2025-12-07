import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography
} from "@mui/material";
import { GetStartedButton } from "@/components/GetStartedButton";
import { PositionFigure } from "@/components/css-figures/PositionFigure";
import { TransformFigure } from "@/components/css-figures/TransformFigure";
import Image from "next/image";

export default function Home() {
  const features = [
    { icon: "📋", text: "Track your job applications" },
    { icon: "📄", text: "Analyze your resume" },
    { icon: "📊", text: "Visualize your progress" },
    { icon: "💼", text: "Prepare for interviews" }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 relative overflow-hidden">
      <div className="absolute top-10 left-10 opacity-30">
        <PositionFigure />
      </div>
      <div className="absolute bottom-10 right-10 opacity-30">
        <TransformFigure />
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          <Image
            src="/cat_smile.jpg"
            alt="Hirely Logo"
            width={64}
            height={64}
            className="object-cover"
          />

          <Typography
            variant="h2"
            component="h1"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text font-bold"
          >
            Hirely
          </Typography>
        </div>

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
