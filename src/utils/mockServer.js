import { rest } from "msw";
import { setupServer } from "msw/node";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const server = setupServer(
  rest.get("/bus/NW53HG", async (req, res, ctx) => {
    await sleep(1000);
    return res(
      ctx.json({
        response: [
          {
            buses: [{ busName: "46", destination: "Paddington", eta: 440 }],
            roadName: "Malden Road",
            stopName: "Stop KT",
          },
        ],
      })
    );
  }),
  rest.get("/bus/CB11AJ", (req, res, ctx) => {
    return res(
      ctx.json({
        response: [],
      })
    );
  }),
  rest.get("/bus/invalid", (req, res, ctx) => {
    return res(ctx.status(500));
  })
);
