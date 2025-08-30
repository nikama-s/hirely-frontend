import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

export default function Home() {
  const features = [
    { icon: "📋", text: "Track your job applications" },
    { icon: "📄", text: "Analyze your resume" },
    { icon: "📊", text: "Visualize your progress" },
    { icon: "💼", text: "Prepare for interviews" },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 gap-6">
      <div className="flex flex-col items-center gap-3">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            background: "linear-gradient(45deg, #3B82F6 30%, #8B5CF6 90%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          Hirely
        </Typography>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: "0 3px 15px rgba(0, 0, 0, 0.1)",
            maxWidth: 400,
          }}
        >
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
        sx={{
          background: "linear-gradient(45deg, #3B82F6 30%, #8B5CF6 90%)",
          borderRadius: "25px",
          padding: "12px 32px",
          fontSize: "1.1rem",
          fontWeight: 600,
          boxShadow: "0 3px 15px rgba(59, 130, 246, 0.3)",
          "&:hover": {
            background: "linear-gradient(45deg, #2563EB 30%, #7C3AED 90%)",
            boxShadow: "0 6px 20px rgba(59, 130, 246, 0.4)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.3s ease-in-out",
        }}
      >
        Get Started ✨
      </Button>
    </main>
  );
}
