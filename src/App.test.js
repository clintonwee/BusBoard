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

test("Renders header correctly", () => {
  render(<App />);
  const linkElement = screen.getByText("Thomas the Bus");
  expect(linkElement).toBeInTheDocument();
});

test("Renders subheader correctly", () => {
  render(<App />);
  const linkElement = screen.getByText(
    "Don't find the bus, let the bus find you!"
  );
  expect(linkElement).toBeInTheDocument();
});

test("Renders input element", () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText("CB11AJ");
  expect(inputElement).toBeInTheDocument();
});

test("Renders a spinner", () => {
  render(<Spinner />);
  expect(screen.getByTestId("spinner")).toBeInTheDocument();
});

test("Original Result Message", () => {
  render(<App />);
  const originalMessageElement = screen.getByText("Bus Times Displayed Here");
  expect(originalMessageElement).toBeInTheDocument();
});

test("Original Result Message after Removing all Input", async () => {
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

test("Invalid Postcode Message", async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText("CB11AJ");
  fireEvent.change(inputElement, { target: { value: "invalid" } });
  await screen.findByTestId("error", {}, { timeout: 1200 });
  expect(screen.getByTestId("error")).toHaveTextContent("Invalid Postcode...");
});

test("No Buses Found Message", async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText("CB11AJ");
  fireEvent.change(inputElement, { target: { value: "CB11AJ" } });
  await screen.findByTestId("noBus", {}, { timeout: 1200 });
  expect(screen.getByTestId("noBus")).toHaveTextContent(
    "Time to walk buddy..."
  );
});

test("Post Code Results", async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText("CB11AJ");
  fireEvent.change(inputElement, { target: { value: "NW53HG" } });
  await screen.findByTestId("stopContainer", {}, { timeout: 1200 });

  expect(screen.getByTestId("stopContainer")).toBeInTheDocument();

  expect(screen.getByTestId("busBox")).toBeInTheDocument();

  expect(screen.getByTestId("stopName")).toHaveTextContent("Stop KT");

  expect(screen.getByTestId("roadName")).toHaveTextContent("Malden Road");

  expect(screen.getByTestId("busName")).toHaveTextContent("46");

  expect(screen.getByTestId("busDestination")).toHaveTextContent("Paddington");

  expect(screen.getByTestId("busEta")).toHaveTextContent("7 min 20 s");
});
