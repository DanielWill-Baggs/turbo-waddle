import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";

export default function VideoCard({ video }) {
  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md"> {video.title}</Heading>
        </CardHeader>
        <CardBody>
          <Text>Created At: {video.createdAt}</Text>
        </CardBody>
        <CardFooter>
          <Button>View here</Button>
        </CardFooter>
      </Card>
    </>
  );
}
