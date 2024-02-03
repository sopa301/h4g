import { Skeleton, Stack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Stack padding="5px">
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );
}
