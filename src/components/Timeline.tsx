import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import moment from 'moment';
import type { CompanyStory } from "@prisma/client";
import Typography from "./Typography";

export default function TimelineComponents({companystories}:{companystories:CompanyStory[]})
{
  return (
    <React.Fragment>
      <Typography color="inherit" align="center" variant="h2" sx={{ mt: 10 }}>
        Notre Histoire ...
      </Typography>
      <Timeline position="alternate" sx={{ mt: 10 }}>
        {companystories.map((companystory: CompanyStory, i) => (
          <TimelineItem key = {i}>
            <TimelineOppositeContent color="text.secondary">
              {moment(companystory.start).format('DD-MMM-YYYY')}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent> {companystory.title}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </React.Fragment>
  );
}


