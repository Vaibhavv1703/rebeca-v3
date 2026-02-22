import React from "react";
import "./EventList.css";
import { Link } from "react-router-dom";

export const extractTime = (isoString) => {
    if (!isoString) return "";
    // If it's already a human-readable time like "Day 1 17:00", return as-is
    if (typeof isoString === "string" && /Day\s*\d+/i.test(isoString)) return isoString;

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString || "";

    const startTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return startTime;
};

export const extractFullDate = (isoString, removeYear = false) => {
    if (!isoString) return "";

    // If input already looks like a human-friendly schedule string, return it.
    if (typeof isoString === "string" && /Day\s*\d+/i.test(isoString)) return isoString;

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString || "";

    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date);
    const year = date.getFullYear();

    const startTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    let ordinalSuffix = "th";
    if (day % 10 === 1 && day !== 11) {
        ordinalSuffix = "st";
    } else if (day % 10 === 2 && day !== 12) {
        ordinalSuffix = "nd";
    } else if (day % 10 === 3 && day !== 13) {
        ordinalSuffix = "rd";
    }

    const formattedTime = `${day}${ordinalSuffix} ${month}${removeYear ? "" : " " + year}, ${startTime}`;

    return formattedTime;
};


const EventList = ({ eventlist }) => {
    return (
        <div className="list">
            <div className="timings">
                {eventlist.map((a, i) => {
                    return (
                        <div className="row" key={i}>
                            <div className="time">{a && a.rounds && extractTime(a.rounds?.[0]?.start || a.rounds?.[0]?.startTime || a.startTime)}</div>
                            <div className="linespace"></div>
                            <Link
                                to={`/events/${a.slug}`}
                            >
                                <div className="eventname">
                                    {a.eventName}
                                    <div className="material-icons">open_in_new</div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EventList;
