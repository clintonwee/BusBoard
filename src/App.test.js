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
  const linkElement = screen.getByText(/thomas the bus/i);
  expect(linkElement).toBeInTheDocument();
});

test("Renders subheader correctly", () => {
  render(<App />);
  const linkElement = screen.getByText(
    /Don't find the bus, let the bus find you/i
  );
  expect(linkElement).toBeInTheDocument();
});

test("Renders input element", () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText("CB11AJ");
  expect(inputElement).toBeInTheDocument();
});

test("Renders a spinner", () => {
  const { getByRole } = render(<Spinner />);
  expect(getByRole("spinner")).toBeInTheDocument();
});

test("Original Result Message", () => {
  render(<App />);
  const originalMessageElement = screen.getByText("Bus Times Displayed Here");
  expect(originalMessageElement).toBeInTheDocument();
});

test("Invalid Postcode Message", async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText("CB11AJ");
  fireEvent.change(inputElement, { target: { value: "invalid" } });
  await screen.findByRole("error", {}, { timeout: 1200 });
  expect(screen.getByRole("error")).toHaveTextContent("Invalid Postcode...");
});

test("No Buses Found Message", async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText("CB11AJ");
  fireEvent.change(inputElement, { target: { value: "CB11AJ" } });
  await screen.findByRole("noBus", {}, { timeout: 1200 });
  expect(screen.getByRole("noBus")).toHaveTextContent("Time to walk buddy...");
});

test("Post Code Results", async () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText("CB11AJ");
  fireEvent.change(inputElement, { target: { value: "NW53HG" } });
  await screen.findByRole("stopContainer", {}, { timeout: 1200 });
  expect(screen.getByRole("stopContainer")).toBeInTheDocument();
});
