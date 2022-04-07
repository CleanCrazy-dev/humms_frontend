import { useAlerts } from "@state/application/hooks";
import Alert from "./Alert";

export const AlertManager = () => {
  const alerts = useAlerts();

  return (
    <div className="fixed z-20 bottom-0 right-4 mb-5">
      {alerts.map((alert) => (
        <Alert
          key={alert.key}
          alertKey={alert.key}
          show={alert.show}
          removeAfterMs={alert.removeAfterMs}
          {...alert.props}
        />
      ))}
    </div>
  )
}