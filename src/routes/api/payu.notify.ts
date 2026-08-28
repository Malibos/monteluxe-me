import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/payu/notify")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text();
        let orderId = "";
        let extId = "";
        let status = "";
        try {
          const json = JSON.parse(raw) as {
            order?: {
              orderId?: string;
              extOrderId?: string;
              status?: string;
            };
          };
          orderId = json.order?.orderId ?? "";
          extId = json.order?.extOrderId ?? "";
          status = json.order?.status ?? "";
        } catch {
          const params = new URLSearchParams(raw);
          status = params.get("status") ?? "";
          extId = params.get("extOrderId") ?? "";
          orderId = params.get("orderId") ?? "";
        }
        if (extId && (status === "COMPLETED" || status === "completed")) {
          const { getSql } = await import("@/lib/db");
          const sql = await getSql();
          await sql.query(
            "update bookings set status = 'awaiting_host', paid_at = now(), payu_order_id = $2 where id = $1",
            [extId, orderId || null],
          );
        }
        return new Response("OK", { status: 200 });
      },
    },
  },
});
