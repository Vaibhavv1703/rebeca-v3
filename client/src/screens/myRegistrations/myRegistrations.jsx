import React from "react";
import {
    Container, Typography, Box, CircularProgress,
    Card, CardContent, Chip, Divider, IconButton,
    Tooltip
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Headingv2 from "../../components/Headingv2/Headingv2";
import { useAuth } from "../../AuthContext";
import "./MyRegistrations.css";

const formatEventName = (slug) => {
    if (!slug) return "Unknown Event";
    return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
};

const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
        day: "2-digit", month: "short", year: "numeric",
    });

const RegistrationCard = ({ reg }) => {
    const isTeam = reg.teamMem?.length > 0;

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>

                {/* Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                    <Typography variant="h6" fontWeight={600} sx={{ fontSize: "1rem" }}>
                        {formatEventName(reg.event)}
                    </Typography>
                    <Chip
                        size="small"
                        icon={isTeam ? <GroupsIcon /> : <PersonIcon />}
                        label={isTeam ? "Team" : "Solo"}
                        color={isTeam ? "primary" : "default"}
                        variant="outlined"
                    />
                </Box>

                <Typography variant="caption" color="text.secondary">
                    Registered: {formatDate(reg.createdAt)}
                </Typography>

                {/* Team info */}
                {isTeam && (
                    <>
                        <Divider sx={{ my: 1.5 }} />
                        <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                            {reg.teamName || "—"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                            MEMBERS
                        </Typography>
                        {reg.teamMem.map((m, i) => (
                            <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                                <Typography variant="body2">{m.name}</Typography>
                                <Typography variant="body2" color="text.secondary">{m.phone}</Typography>
                            </Box>
                        ))}
                    </>
                )}

                {/* Payment & Asset — always shown */}
                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>

                    {/* Payment — always rendered */}
                    <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                            PAYMENT
                        </Typography>
                        {reg.paymentSS && reg.paymentSS.trim() !== "" ? (
                            <Chip
                                size="small"
                                label="View Receipt"
                                icon={<OpenInNewIcon fontSize="small" />}
                                onClick={() => window.open(reg.paymentSS, "_blank")}
                                clickable
                                color="success"
                                variant="outlined"
                            />
                        ) : (
                            <Chip size="small" label="Pending" color="warning" variant="outlined" />
                        )}
                    </Box>

                    {/* Asset — only if present */}
                    {reg.assetUpload && reg.assetUpload.trim() !== "" && (
                        <Box>
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
                                ASSET
                            </Typography>
                            <Chip
                                size="small"
                                label="View Asset"
                                icon={<OpenInNewIcon fontSize="small" />}
                                onClick={() => window.open(reg.assetUpload, "_blank")}
                                clickable
                                variant="outlined"
                            />
                        </Box>
                    )}
                </Box>

            </CardContent>
        </Card>
    );
};

const MyRegistrations = () => {
    const { userRegs, handleAllUserRegs, userLoad } = useAuth();

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            {/* 1. Heading isolated and centered */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                <Headingv2 title="MY REGISTRATIONS" />
            </Box>

            {/* 2. New "Toolbar" row right above the cards */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mb: 2 }}>
                
                {/* Shows the count on the left side of the refresh button if they have registrations */}
                {!userLoad && userRegs.length > 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                        {userRegs.length} registration{userRegs.length !== 1 ? "s" : ""}
                    </Typography>
                )}

                <Tooltip title="Refresh">
                    <IconButton onClick={handleAllUserRegs} disabled={userLoad}>
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* 3. The conditionally rendered content */}
            {userLoad ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 12 }}>
                    <CircularProgress size={60} />
                </Box>
            ) : userRegs.length === 0 ? (
                <Card variant="outlined" sx={{ p: 6, textAlign: "center" }}>
                    <Typography variant="h6" color="text.secondary">No Registrations Yet</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Head over to the events page to register!
                    </Typography>
                </Card>
            ) : (
                <>
                    {/* The old count text was removed from here and moved to the toolbar above */}
                    {userRegs.map((reg) => (
                        <RegistrationCard key={reg._id} reg={reg} />
                    ))}
                </>
            )}
        </Container>
    );
};

export default MyRegistrations;