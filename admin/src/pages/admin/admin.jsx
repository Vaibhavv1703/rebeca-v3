import React from "react";
import { PageContainer } from "@toolpad/core/PageContainer";
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";
import StatCard from "../../components/StatCard/StatCard";
import { useData } from "../../DataContext";
import { useNavigate } from "react-router";
import { BarChart } from "@mui/x-charts/BarChart";

const Admin = () => {
    const { registrations, loading } = useData();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    console.log(registrations);

    const counts = registrations.reduce((acc, reg) => {
        acc[reg.event] = (acc[reg.event] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(counts)
        .map(([name, count]) => ({ event: name, total: count }))
        .sort((a, b) => b.total - a.total);

    const totalPeople = registrations.reduce((sum, r) => {
        return sum + 1 + (r.teamMem?.length || 0);
    }, 0);

    const stats = {
        totalPeople,
        uniqueEvents: new Set(registrations.map((r) => r.event)).size,
    };

    return (
        <PageContainer title="">
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                        gap: 2,
                    }}
                >
                    <StatCard
                        icon={<EventIcon />}
                        label="Total Events"
                        value={stats.uniqueEvents}
                        color="secondary.main"
                        onClick={() => navigate("/events")}
                    />
                    <StatCard
                        icon={<PeopleIcon />}
                        label="Total Participants"
                        value={stats.totalPeople}
                        color="primary.main"
                        onClick={() => navigate("/registrations")}
                    />
                </Box>
            )}
            <Box sx={{ width: "100%", maxWidth: 800, mt: 4 }}>
                <BarChart
                    dataset={chartData}
                    // Essential for horizontal view
                    layout="horizontal"
                    // Set the categorical axis on Y
                    yAxis={[
                        {
                            scaleType: "band",
                            dataKey: "event",
                        },
                    ]}
                    // Set the numerical axis on X
                    xAxis={[
                        {
                            label: "Number of Registrations",
                        },
                    ]}
                    series={[
                        {
                            dataKey: "total",
                            label: "Registrations",
                            barLabel: "value", // Shows the number on the bar
                        },
                    ]}
                    // Adjust margins so event names aren't cut off
                    margin={{ left: 140, right: 40, top: 20, bottom: 40 }}
                    // Height should be dynamic based on number of items
                    height={chartData.length * 50 + 100}
                    // Adds vertical grid lines for easier reading
                    grid={{ vertical: true }}
                />
            </Box>
        </PageContainer>
    );
};

export default Admin;
