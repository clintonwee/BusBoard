import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import App from "./App";
import Spinner from "./components/Spinner";
import { server } from "./utils/mockServer";

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => server.close());

test("Header is rendered with correct text", () => {
  render(<App />);
  const linkElement = screen.getByText("Thomas the Bus");
  expect(linkElement).toBeInTheDocument();
});

test("Subheader is rendered with correct text", () => {
  render(<App />);
  const linkElement = screen.getByText(
    "Don't find the bus, let the bus find you!"
  );
  expect(linkElement).toBeInTheDocument();
});

test("Input element with correct placeholder text is rendered", () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText("CB11AJ");
  expect(inputElement).toBeInTheDocument();
});

test("Spinner element is rendered when loading", async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText("CB11AJ");
  fireEvent.change(inputElement, { target: { value: "NW53HG" } });
  await screen.findByTestId("spinner", {}, { timeout: 3000 });
  expect(screen.getByTestId("spinner")).toBeInTheDocument();
});

test("Original Result Message is displayed at the start, without any user input", () => {
  render(<App />);
  const originalMessageElement = screen.getByText("Bus Times Displayed Here");
  expect(originalMessageElement).toBeInTheDocument();
});

test("Original Result Message is displayed after input has been cleared", async () => {
  render(<App />);
  let originalMessageElement = screen.getByText("Bus Times Displayed Here");
  const inputElement = screen.getByPlaceholderText("CB11AJ");
  fireEvent.change(inputElement, { target: { value: "invalid" } });
  await screen.findByTestId("error", {}, { timeout: 1200 });

  fireEvent.change(inputElement, { target: { value: "" } });

  originalMessageElement = await screen.findByText(
    "Bus Times Displayed Here",
    {},
    { timeout: 1200 }
  );
  expect(originalMessageElement).toBeInTheDocument();
});

test("Invalid Postcode Message is displayed when user enters a postcode that does not exist", async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText("CB11AJ");
  fireEvent.change(inputElement, { target: { value: "invalid" } });
  await screen.findByTestId("error", {}, { timeout: 1200 });
  expect(screen.getByTestId("error")).toHaveTextContent("Invalid Postcode...");
});

test("'No Buses Found' message is displayed when there are no buses nearby the entered postcode", async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText("CB11AJ");
  fireEvent.change(inputElement, { target: { value: "CB11AJ" } });
  await screen.findByTestId("noBus", {}, { timeout: 1200 });
  expect(screen.getByTestId("noBus")).toHaveTextContent(
    "Time to walk buddy..."
  );
});

test("List of buses are displayed when a valid postcode has been entered, and there are buses nearby that postcode", async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText("CB11AJ");
  fireEvent.change(inputElement, { target: { value: "NW53HG" } });
  await screen.findByTestId("stopContainer", {}, { timeout: 3000 });

  expect(screen.getByTestId("stopContainer")).toBeInTheDocument();

  expect(screen.getByTestId("busBox")).toBeInTheDocument();

  expect(screen.getByTestId("stopName")).toHaveTextContent("Stop KT");

  expect(screen.getByTestId("roadName")).toHaveTextContent("Malden Road");

  expect(screen.getByTestId("busName")).toHaveTextContent("46");

  expect(screen.getByTestId("busDestination")).toHaveTextContent("Paddington");

  expect(screen.getByTestId("busEta")).toHaveTextContent("7 min 20 s");
});
