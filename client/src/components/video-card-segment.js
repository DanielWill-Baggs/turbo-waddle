import React from "react";
import { Card, CardHeader, CardBody, Heading, Text } from "@chakra-ui/react";

export default function VideoSegmentCard({ videosegment }) {
  return (
    <>
      <br></br>
      <Card padding={"10px"}>
        <CardHeader>
          <Heading size="md"> {videosegment.filename}</Heading>
        </CardHeader>
        <CardBody>
          <Text>Video ID: {videosegment._id}</Text>
        </CardBody>
      </Card>
    </>
  );
}
