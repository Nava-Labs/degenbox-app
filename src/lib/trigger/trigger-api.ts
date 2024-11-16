import { logger, schedules, wait } from "@trigger.dev/sdk/v3";

export const fetchTxReceiveTask = schedules.task({
  id: "fetch-tx-receive-task",
  // This task will run every hour, but we will control the fetch frequency within the task
  cron: "0 * * * *",
  run: async () => {
    const interval = 5000; // 5 seconds
    const duration = 60000; // 1 minute
    const endTime = Date.now() + duration;

    try {
      const response = await fetch("https://degenbox.xyz/api/usdc/tx-status"); //this to check the attestation status and receive trigger
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      logger.log(data); // Process the data as needed
    } catch (error) {
      logger.error("Fetch error:", error as Record<string, unknown>);
    }

    // Wait for 5 seconds before the next fetch
    await wait.for({ seconds: 5 });
  },
});