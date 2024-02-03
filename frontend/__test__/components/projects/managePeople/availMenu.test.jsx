import React from "react";
import { fireEvent, render } from "../../../test_utils";
import { DateTime } from "luxon";
import AvailMenu from "../../../../src/components/projects/managePeople/availMenu";
import userEvent from "@testing-library/user-event";

function convertToEnDateTime(dateTime) {
  return (
    dateTime.setLocale("en-gb").toLocaleString() +
    " " +
    dateTime.toLocaleString(DateTime.TIME_SIMPLE)
  );
}

test("If it renders properly", () => {
  const startTime = DateTime.local(1000, 1, 1, 12);
  const endTime = DateTime.local(2020, 2, 2, 12);
  const settings = {
    title: "AVAILS",
    initialValues: { start: startTime, end: endTime },
    onSubmit: () => {},
  };
  const compo = render(<AvailMenu isOpen={true} {...settings} />);
  expect(compo.queryAllByText("AVAILS")).toHaveLength(2);
  expect(compo.queryByText("Interval")).toBeTruthy();

  expect(
    compo.queryAllByDisplayValue(
      startTime.setLocale("en-gb").toLocaleString() +
        " " +
        startTime.toLocaleString(DateTime.TIME_SIMPLE)
    )
  ).toBeTruthy();
  expect(
    compo.queryAllByDisplayValue(
      endTime.setLocale("en-gb").toLocaleString() +
        " " +
        endTime.toLocaleString(DateTime.TIME_SIMPLE)
    )
  ).toBeTruthy();
});
test("Loading icon appears on submit", async () => {
  const user = userEvent.setup();
  const startTime = DateTime.local(1000, 1, 1, 12);
  const endTime = DateTime.local(2020, 2, 2, 12);
  const settings = {
    title: "AVAILS",
    initialValues: { start: startTime, end: endTime },
    onSubmit: (values, actions) => {
      expect(compo.queryByText("Loading...")).toBeTruthy();
    },
  };
  const compo = render(<AvailMenu isOpen={true} {...settings} />);
  await user.click(compo.queryAllByText("AVAILS")[1]);
});
test("If it submits stated values correctly", async () => {
  const user = userEvent.setup();
  const startTime = DateTime.local(1000, 1, 1, 12);
  const endTime = DateTime.local(2020, 2, 2, 12);
  const settings = {
    title: "AVAILS",
    initialValues: { start: startTime, end: endTime },
    onSubmit: (values, actions) => {
      expect(values.start).toEqual(startTime);
      expect(values.end).toEqual(endTime);
    },
  };
  const compo = render(<AvailMenu isOpen={true} {...settings} />);
  await user.click(compo.queryAllByText("AVAILS")[1]);
});
test("If it submits typed values correctly", async () => {
  const user = userEvent.setup();
  const startTime = DateTime.local(1000, 1, 1, 12);
  const endTime = DateTime.local(2020, 2, 2, 12);
  const settings = {
    title: "AVAILS",
    initialValues: { start: undefined, end: undefined },
    onSubmit: (values, actions) => {
      expect(values.start).toEqual(startTime);
      expect(values.end).toEqual(endTime);
    },
  };
  const compo = render(<AvailMenu isOpen={true} {...settings} />);
  await userEvent.type(
    compo.queryAllByPlaceholderText("DD/MM/YYYY hh:mm aa")[0],
    convertToEnDateTime(startTime)
  );
  // The previously first empty field is now no longer empty
  await userEvent.type(
    compo.queryAllByPlaceholderText("DD/MM/YYYY hh:mm aa")[0],
    convertToEnDateTime(endTime)
  );
  await user.click(compo.queryAllByText("AVAILS")[1]);
});
